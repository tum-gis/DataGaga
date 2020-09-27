///<reference path="../core/NonFirstNormalFormDataSource.ts"/>
/**
 * Defines attribute names in KML that can be queried using QBE expressions.
 */
const enum QueryableAttributeNamesKML {
    /**
     * Placemark ID
     */
    ID = "id",

    /**
     * Placemark name
     */
    NAME = "name",

    /**
     * Placemark visibility
     */
    VISIBILITY = "visibility",

    /**
     * Name of simple data elements in placemark
     * (which is also called "name", so the identifier "simpledata_name" is used)
     */
    SIMPLEDATA_NAME = "simpledata_name",

    /**
     * Value of simple data elements in placemark
     * (which is a text node and does not have a name, so the identifier "simpledata_value" is used)
     */
    SIMPLEDATA_VALUE = "simpledata_value"
}

/**
 * Implementation for KML as data source.
 */
class KML extends NonFirstNormalFormDataSource implements ReadableDataSource, ProxyDataSource {

    proxyPrefix: string;

    /**
     * A constructor to instantiate a KML object.
     * This requires an object options with the following structure
     *
     *
     * |    Attribute name      |   Data type               |   Default value           |
     * |------------------------|---------------------------|---------------------------|
     * |    name                |   string                  |   My data source name     |
     * |    provider            |   string                  |   My data source provider |
     * |    uri                 |   string                  |   **REQUIRED**            |
     *
     * @param options an object containing the required information
     *
     */
    public constructor(options: KMLOptions) {
        super(options);

        // Initialize capabilities
        let capabilitiesOptions: DataSourceCapabilities = {
            webCapabilities: {
                restAPI: false
            },
            dbTransactionCapabilities: {
                read: true,
                insert: false,
                delete: false,
                update: false
            },
            securityCapabilities: {
                oauth: false
            }
        };
        this._capabilities = capabilitiesOptions;

        this.proxyPrefix = options.proxyPrefix;
    }

    public getMetaData(): Promise<JSONObject> {
        // TODO
        throw new Error("Method not implemented.");
    }

    public aggregateByIds(ids: Array<string>, aggregateOperator: AggregateOperator, attributeName: string): Promise<number>;
    public aggregateByIds(ids: Array<string>, aggregateOperator: AggregateOperator): Promise<{ kvp: KVP }>;
    public aggregateByIds(ids: Array<string>, aggregateOperator: AggregateOperator, attributeName?: string): Promise<number> | Promise<{ kvp: KVP }> {
        // TODO
        throw new Error("Method not implemented.");
    }

    public fetchAttributeNamesFromId(id: string): Promise<Set<string>> {
        // TODO
        throw new Error("Method not implemented.");
    }

    public fetchAttributeValuesFromId(id: string): Promise<FetchResultSet> {
        let scope = this;
        return new Promise(function (resolve, reject) {
            WebUtil.httpGet((scope._uri.indexOf(scope.proxyPrefix) >= 0 ? "" : scope.proxyPrefix) + scope._uri).then(function (result) {
                let xmlParser = new DOMParser();
                let xmlDoc = xmlParser.parseFromString(result, "text/xml");
                let placemark: HTMLElement | null = xmlDoc.getElementById(id);
                if (placemark == null) {
                    reject("KML Placemark with ID = " + id + " does not exist!");
                    return;
                }
                /*
                    <ExtendedData>
                        <SchemaData schemaUrl="#schema">
                            <SimpleData name="Name">Object Name</SimpleData>
                            <SimpleData name="Adresse">Street Number</SimpleData>
                        </SchemaData>
                    </ExtendedData>
                 */
                let extendedData = placemark.getElementsByTagName('ExtendedData')[0];
                let schemaData = extendedData.getElementsByTagName('SchemaData')[0];
                let simpleDataList = schemaData.getElementsByTagName('SimpleData');

                let array = [];
                let kvp: KVP = {};
                kvp["id"] = id;
                for (let i = 0; i < simpleDataList.length; i++) {
                    let key: string | null = simpleDataList[i].getAttribute("name");
                    let value = simpleDataList[i].textContent;
                    if (key != null) {
                        kvp[key] = value;
                    }
                }
                array.push(kvp);

                let fetchResultSet = new FetchResultSet(array);
                resolve(fetchResultSet);
            }).catch(function (error) {
                reject(error);
            });
        })
    }

    /**
     * If the placemarks do not have IDs, their names can be used instead as unique identifiers.
     * This functions fetches the attributes and values based on a given name.
     * This name must however be unique for each placemark.
     *
     * @param id
     * @return a promise FetchResultSet object
     */
    public fetchAttributeValuesFromName(name: string): Promise<FetchResultSet> {
        let scope = this;
        return new Promise(function (resolve, reject) {
            WebUtil.httpGet((scope._uri.indexOf(scope.proxyPrefix) >= 0 ? "" : scope.proxyPrefix) + scope._uri).then(function (result) {
                let xmlParser = new DOMParser();
                let xmlDoc = xmlParser.parseFromString(result, "text/xml");
                let placemarks = xmlDoc.getElementsByTagName("Placemark");
                for (let i = 0; i < placemarks.length; i++) {
                    let iPlacemark = placemarks[i];
                    let placemarkName = iPlacemark.getElementsByTagName("name")[0];
                    if (placemarkName.textContent === name) {
                        /*
                            <ExtendedData>
                                <SchemaData schemaUrl="#schema">
                                    <SimpleData name="Name">Object Name</SimpleData>
                                    <SimpleData name="Adresse">Street Number</SimpleData>
                                </SchemaData>
                            </ExtendedData>
                         */
                        let extendedData = iPlacemark.getElementsByTagName('ExtendedData')[0];
                        let schemaData = extendedData.getElementsByTagName('SchemaData')[0];
                        let simpleDataList = schemaData.getElementsByTagName('SimpleData');

                        let array = [];
                        let kvp: KVP = {};
                        kvp["id"] = name;
                        for (let i = 0; i < simpleDataList.length; i++) {
                            let key = simpleDataList[i].getAttribute("name");
                            let value = simpleDataList[i].textContent;
                            if (key != null) {
                                kvp[key] = value;
                            }
                        }
                        array.push(kvp);

                        let fetchResultSet = new FetchResultSet(array);
                        resolve(fetchResultSet);
                    }
                }
            }).catch(function (error) {
                reject(error);
            });
        })
    }

    /**
     * Fetches all placemark IDs that satisfy the given Query-By-Example expression.
     * Such as find all placemarks that are visible, or have the same name "Placemark".
     * If the placemarks do not have IDs, their names shall be returned instead.
     *
     * @param qbe a Query-By-Example expression, the attribute name must be either "id", "name", "visibility", "simpledata_name" or "simpledata_value"
     * @param limit (optional) maximum number of returned IDs
     * @return an array of distinct placemark IDs or names
     */
    public fetchIdsFromQBE(qbe: QBE, limit?: number): Promise<Set<string>> {
        let scope = this;
        return new Promise(function (resolve, reject) {
            WebUtil.httpGet((scope._uri.indexOf(scope.proxyPrefix) >= 0 ? "" : scope.proxyPrefix) + scope._uri).then(function (result) {
                let xmlParser = new DOMParser();
                let xmlDoc = xmlParser.parseFromString(result, "text/xml");

                if (limit == null) {
                    limit = Number.MAX_VALUE;
                }

                let array = new Set<string>();
                let count = 0;
                let placemarks = xmlDoc.getElementsByTagName("Placemark");
                switch (qbe.attributeName) {
                    case QueryableAttributeNamesKML.ID:
                        // Search by placemark ID, which should return the same ID
                        array = new Set<string>();
                        count = 0;
                        if (++count <= limit) {
                            array.add(qbe.value);
                        }
                        resolve(array);
                        break;
                    case QueryableAttributeNamesKML.NAME:
                        // Search by placemark name
                        array = new Set<string>();
                        count = 0;
                        for (let i = 0; i < placemarks.length; i++) {
                            let iPlacemark = placemarks[i];
                            let placemarkName = iPlacemark.getElementsByTagName("name")[0];
                            if (placemarkName != null && qbe.assert(placemarkName.textContent)) {
                                if (++count <= limit) {
                                    let tmpId = iPlacemark.getAttribute("id");
                                    if (tmpId == null) {
                                        tmpId = iPlacemark.getElementsByTagName("name")[0].textContent;
                                    }
                                    if (tmpId == null) {
                                        tmpId = "";
                                    }
                                    array.add(tmpId);
                                }
                            }
                        }
                        resolve(array);
                        break;
                    case QueryableAttributeNamesKML.VISIBILITY:
                        // Search by placemark visibility
                        array = new Set<string>();
                        count = 0;
                        for (let i = 0; i < placemarks.length; i++) {
                            let iPlacemark = placemarks[i];
                            let placemarkVisibility = iPlacemark.getElementsByTagName("visibility")[0];
                            if (placemarkVisibility != null && qbe.assert(placemarkVisibility.textContent)) {
                                if (++count <= limit) {
                                    let tmpId = iPlacemark.getAttribute("id");
                                    if (tmpId == null) {
                                        tmpId = iPlacemark.getElementsByTagName("name")[0].textContent;
                                    }
                                    if (tmpId == null) {
                                        tmpId = "";
                                    }
                                    array.add(tmpId);
                                }
                            }
                        }
                        resolve(array);
                        break;
                    case QueryableAttributeNamesKML.SIMPLEDATA_NAME:
                        // Search by name of SimpleData elements in ExtendedData of placemarks
                        array = new Set<string>();
                        count = 0;
                        for (let i = 0; i < placemarks.length; i++) {
                            let iPlacemark = placemarks[i];
                            let extendedData = iPlacemark.getElementsByTagName('ExtendedData')[0];
                            let schemaData = extendedData.getElementsByTagName('SchemaData')[0];
                            let simpleDataList = schemaData.getElementsByTagName('SimpleData');

                            for (let i = 0; i < simpleDataList.length; i++) {
                                let key = simpleDataList[i].getAttribute("name");
                                if (qbe.assert(key)) {
                                    if (++count <= limit) {
                                        let tmpId = iPlacemark.getAttribute("id");
                                        if (tmpId == null) {
                                            tmpId = iPlacemark.getElementsByTagName("name")[0].textContent;
                                        }
                                        if (tmpId == null) {
                                            tmpId = "";
                                        }
                                        array.add(tmpId);
                                    }
                                    break;
                                }
                            }
                        }
                        resolve(array);
                        break;
                    case QueryableAttributeNamesKML.SIMPLEDATA_VALUE:
                        // Search by value of SimpleData elements in ExtendedData of placemarks
                        array = new Set<string>();
                        count = 0;
                        for (let i = 0; i < placemarks.length; i++) {
                            let iPlacemark = placemarks[i];
                            let extendedData = iPlacemark.getElementsByTagName('ExtendedData')[0];
                            let schemaData = extendedData.getElementsByTagName('SchemaData')[0];
                            let simpleDataList = schemaData.getElementsByTagName('SimpleData');

                            for (let i = 0; i < simpleDataList.length; i++) {
                                let value = simpleDataList[i].textContent;
                                if (qbe.assert(value)) {
                                    if (++count <= limit) {
                                        // one of the target placemarks found
                                        // if a placemark does not have ID -> use its name instead
                                        let tmpId = iPlacemark.getAttribute("id");
                                        if (tmpId == null) {
                                            tmpId = iPlacemark.getElementsByTagName("name")[0].textContent;
                                        }
                                        if (tmpId == null) {
                                            tmpId = "";
                                        }
                                        array.add(tmpId);
                                    }
                                    break;
                                }
                            }
                        }
                        resolve(array);
                        break;
                    default:
                        reject("Could not assert " + qbe.toString() + ".");
                }
                reject("Could not assert " + qbe.toString() + ".");
            }).catch(function (error) {
                reject(error);
            });
        })
    }

    /**
     * Fetches all placemark IDs that satisfy a given array of Query-By-Example expressions.
     * Such as find all placemarks that are visible and have the same name "Placemark".
     *
     * @param qbes an array of Query-By-Example expression, the attribute name of each QBE expression must be either "id", "name", "visibility", "simpledata_name" or "simpledata_value"
     * @param limit (optional) maximum number of returned IDs
     * @return an array of distinct placemark IDs
     */
    public fetchIdsFromQBEs(qbes: Array<QBE>, limit?: number): Promise<Set<string>> {
        let scope = this;
        if (limit == null) {
            limit = Number.MAX_VALUE;
        }
        return new Promise(function (resolve, reject) {
            let array = new Set<string>();
            for (let qbe of qbes) {
                scope.fetchIdsFromQBE(qbe).then(function (result) {
                    // Merge two sets, distinct values only
                    result.forEach(array.add, array);
                }).catch(function (error) {
                    reject(error);
                })
            }
            resolve(new Set<string>(array));
        });
    }
}

interface KMLOptions extends NonFirstNormalFormDataSourceOptions {
    proxyPrefix: string;
}
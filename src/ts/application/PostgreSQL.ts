/**
 * An implementation for the data source PostgREST.
 */
class PostgreSQL extends SQLDataSource implements ReadableDataSource, WritableDataSource, SecuredDataSource {

    /**
     * The name of the column containing the IDs of objects.
     * Normally this is the first column of a table (e.g. gmlid).
     *
     * @private
     */
    private _idColName: string;

    /**
     * A constructor to instantiate a PostgreSQL object.
     * This requires an object options with the following structure
     *
     *
     * |    Attribute name      |   Data type               |   Default value           |
     * |------------------------|---------------------------|---------------------------|
     * |    name                |   string                  |   My data source name     |
     * |    provider            |   string                  |   My data source provider |
     * |    uri                 |   string                  |   **REQUIRED**            |
     * |    capabilities        |   DataSourceCapabilities  |   **built-in**            |
     * |    dataStructureType   |   DataStructureType       |   **REQUIRED**            |
     * |    _proxyPrefix        |   string                  |                           |
     *
     * @param options an object containing the required information
     *
     */
    constructor(options) {
        super(options);

        // Initialize capabilities
        let capabilitiesOptions: DataSourceCapabilities = new DataSourceCapabilities({
            webCapabilities: {
                restAPI: true
            },
            dbTransactionCapabilities: {
                read: true,
                insert: true,
                delete: true,
                update: true
            },
            securityCapabilities: {
                oauth: true
            }
        });
        this._capabilities = capabilitiesOptions;

        Util.initAttribute(this, "_idColName", options.idColName, "gmlid");
    }


    transformToKVPArray(data: any): Array<KVP> {
        // response is just a text -> parse to JSON
        const dataJson = JSON.parse(data);
        let result = Array<KVP>();

        if (this._dataStructureType === DataStructureType.HORIZONTAL) {
            // all attributes per object are stored in one row
            let kvps: KVP = {};
            for (let i = 0; i < dataJson.length; i++) {
                const ele = dataJson[i];
                for (let key in ele) {
                    kvps[key] = ele[key];
                }
            }
            result.push(kvps);
        } else {
            // one attribute per row
            // only store id once
            // (because the vertical table has multiple lines of the same id)
            // result[this.idColName] = dataJson[0][this.idColName];

            for (let i = 0; i < dataJson.length; i++) {
                const ele = dataJson[i];
                // TODO generic implementation for attribute and value
                result[ele.attribute] = ele.value;
            }
        }

        return result;
    }


    queryUsingId(id: string, callback: (queryResult: any) => any, limit?: number, clickedObject?: any): void {
        // TODO use column number instead of column name (such as gmlid here)
        this.queryUsingSql("?" + this.idColName + "=eq." + id, callback, !limit ? Number.MAX_VALUE : limit, clickedObject);
    }

    queryUsingSql(sql: string, callback: (queryResult: any) => any, limit?: number, clickedObject?: any): void {
        // TODO handle limit
        const baseUrl = this._uri;

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var queryResult = xmlHttp.responseText;
                callback(queryResult);
            }
        }
        xmlHttp.open("GET", baseUrl + sql, true); // true for asynchronous
        xmlHttp.send(null);
    }

    aggregateByIds(ids: string[], aggregateOperator: AggregateOperator, attributeName: string): Promise<number>;
    aggregateByIds(ids: string[], aggregateOperator: AggregateOperator): Promise<{ kvp: KVP }>;
    aggregateByIds(ids: string[], aggregateOperator: AggregateOperator, attributeName?: string): Promise<number> | Promise<{ kvp: KVP }> {
        // TODO
        return Promise.resolve(0);
    }

    deleteAttributeOfId(id: string, attributeName: string): Promise<boolean> {
        // TODO
        return Promise.resolve(false);
    }

    deleteAttributesUsingQBE(qbe: QBE, attributeNames: string[]): Promise<boolean> {
        // TODO
        return Promise.resolve(false);
    }

    deleteObjectOfId(id: string): Promise<boolean> {
        // TODO
        return Promise.resolve(false);
    }

    deleteObjectsUsingQBE(qbe: QBE): Promise<boolean> {
        // TODO
        return Promise.resolve(false);
    }

    fetchAttributeNamesFromId(id: string): Promise<string[]> {
        // TODO
        return Promise.resolve([]);
    }

    fetchAttributeValuesFromId(id: string): Promise<FetchResultSet> {
        return new Promise(function (resolve, reject) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", this._uri + "?" + this._idColName + "=eq." + id, true);
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    resolve(xmlHttp.responseText);
                } else {
                    reject({
                        status: xmlHttp.status,
                        statusText: xmlHttp.statusText
                    });
                }
            }
            xmlHttp.onerror = function () {
                reject({
                    status: xmlHttp.status,
                    statusText: xmlHttp.statusText
                });
            };
            xmlHttp.send(null);
        });
    }

    fetchIdsFromQBE(qbe: QBE, limit?: number): Promise<string[]> {
        // TODO
        return Promise.resolve([]);
    }

    insertAttributeOfId(id: string, attributeName: string, attributeValue: any): Promise<boolean> {
        // TODO
        return Promise.resolve(false);
    }

    insertAttributesUsingQBE(qbe: QBE, newAttributes: KVP): Promise<boolean> {
        // TODO
        return Promise.resolve(false);
    }

    insertNewObject(kvp: KVP): Promise<boolean> {
        // TODO
        return Promise.resolve(false);
    }

    login(credentials: any): Promise<boolean> {
        // TODO
        return Promise.resolve(false);
    }

    logout(): Promise<boolean> {
        // TODO
        return Promise.resolve(false);
    }

    updateAttributeValueOfId(id: string, attributeName: string, newValue: any): Promise<boolean> {
        // TODO
        return Promise.resolve(false);
    }

    updateAttributeValuesUsingQBE(qbe: QBE, newAttributeValues: KVP): Promise<boolean> {
        // TODO
        return Promise.resolve(false);
    }
}

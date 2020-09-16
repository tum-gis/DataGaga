///<reference path="../core/XMLDataSource.ts"/>

/**
 * Implementation for KML as data source.
 */
class KML extends XMLDataSource implements ReadableDataSource, WritableDataSource, ProxyDataSource {
    private _useOwnKmlParser: boolean;
    private _thirdPartyHandler: any;

    constructor(options) {
        super(options);

        // Initialize capabilities
        let capabilitiesOptions: DataSourceCapabilities = new DataSourceCapabilities({
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
        });
        this._capabilities = capabilitiesOptions;

        this._useOwnKmlParser = false;
    }

    _proxyPrefix: string;

    get proxyPrefix(): string {
        return this._proxyPrefix;
    }

    set proxyPrefix(value: string) {
        this._proxyPrefix = value;
    }

    responseToKvp(response: any): Map<string, string> {
        if (this._useOwnKmlParser) {
            return this.responseOwnToKvp(response);
        }

        if (this._thirdPartyHandler) {
            switch (this._thirdPartyHandler.type) {
                case "Cesium": {
                    // the handler is Cesium.KML
                    return this.responseCesiumToKvp(response);
                    break;
                }
                default: {
                    // no valid handler found
                    return this.responseOwnToKvp(response);
                    break;
                }
            }
        }
    }

    private responseCesiumToKvp(response: any): Map<string, string> {
        // response is a list of JSON elements
        // only support Data https://cesium.com/docs/cesiumjs-ref-doc/KmlFeatureData.html
        let result = new Map<string, string>();

        /*  <Data name="">
                <displayName></displayName>
                <value></value>
            </Data
         */
        for (let key in response) {
            // if no displayName is available -> use attribute name instead
            if (response[key] && response[key].displayName) {
                result[response[key].displayName] = response[key].value;
            } else {
                result[key] = response[key].value;
            }
        }

        return result;
    }

    private responseOwnToKvp(response: any): Map<string, string> {
        // response is a list of XML DOM element
        let result = new Map<string, string>();

        /* read extended data, only works for the following structure
        <ExtendedData>
            <SchemaData schemaUrl="#some_schema">
                <SimpleData name="A">Text</SimpleData>
                <SimpleData name="B">Text</SimpleData>
            </SchemaData>
        </ExtendedData>
        TODO more general implementation?
         */
        for (let i = 0; i < response.length; i++) {
            let simpleData = response[i];
            result[simpleData.getAttribute('name')] = simpleData.textContent;
        }

        return result;
    }

    queryUsingId(id: string, callback: (queryResult: any) => any, limit?: number, clickedObject?: any): void {
        if (this._thirdPartyHandler) {
            // prioritize the implementation of the provided 3rd-party handler
            switch (this._thirdPartyHandler.type) {
                case "Cesium": {
                    // the handler is Cesium.KML
                    let entities = this._thirdPartyHandler.handler.entities;
                    let entity = entities.getById(id);
                    // entity is Cesium.KMLFeatureData
                    let extendedData = entity.kml.extendedData;
                    if (typeof extendedData === "undefined"
                        || (Object.keys(extendedData).length === 0 && extendedData.constructor === Object)) {
                        // empty response -> use custom implementation
                        this.queryUsingIdCustom(id, callback, limit, clickedObject);
                    } else {
                        callback(extendedData);
                    }
                    break;
                }
                default: {
                    // no valid handler found
                    callback(null);
                    break;
                }
            }
        } else {
            // using own implementation
            this.queryUsingIdCustom(id, callback);
        }
    }

    private queryUsingIdCustom(id: string, callback: (queryResult: any) => any, limit?: number, clickedObject?: any): void {
        this._useOwnKmlParser = true;
        // read KML file
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let xmlParser = new DOMParser();
                let xmlDoc = xmlParser.parseFromString(xhttp.responseText, "text/xml");
                let placemark: Element = xmlDoc.getElementById(id);
                if (placemark == null) {
                    let placemarkNameSearch = clickedObject._name;
                    // the placemarks in the KML file probably do not have IDs
                    // search for its name values instead
                    let placemarks = xmlDoc.getElementsByTagName("Placemark");
                    for (let i = 0; i < placemarks.length; i++) {
                        let iPlacemark = placemarks[i];
                        let placemarkName = iPlacemark.getElementsByTagName("name")[0];
                        if (placemarkName != null && placemarkName.textContent === placemarkNameSearch) {
                            placemark = iPlacemark;
                            break;
                        }
                    }
                }
                let extendedData = placemark.getElementsByTagName('ExtendedData')[0];
                let schemaData = extendedData.getElementsByTagName('SchemaData')[0];
                let simpleDataList = schemaData.getElementsByTagName('SimpleData');
                // return XML DOM element
                callback(simpleDataList);
            }
        };
        // TODO enable proxy for other Data Sources?
        xhttp.open("GET", (this._uri.indexOf(this._proxyPrefix) >= 0 ? "" : this._proxyPrefix) + this._uri, true);
        xhttp.send();
    }

    get useOwnKmlParser(): boolean {
        return this._useOwnKmlParser;
    }

    set useOwnKmlParser(value: boolean) {
        this._useOwnKmlParser = value;
    }

    aggregateByIds(ids: string[], aggregateOperator: AggregateOperator, attributeName: string): Promise<number>;
    aggregateByIds(ids: string[], aggregateOperator: AggregateOperator): Promise<{ kvp: KVP }>;
    aggregateByIds(ids: string[], aggregateOperator: AggregateOperator, attributeName?: string): Promise<number> | Promise<{ kvp: KVP }> {
        return Promise.resolve(undefined);
    }

    deleteAttributeOfId(id: string, attributeName: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    deleteAttributesUsingQBE(qbe: QBE, attributeNames: string[]): Promise<boolean> {
        return Promise.resolve(false);
    }

    deleteObjectOfId(id: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    deleteObjectsUsingQBE(qbe: QBE): Promise<boolean> {
        return Promise.resolve(false);
    }

    fetchAttributeNamesFromId(id: string): Promise<string[]> {
        return Promise.resolve([]);
    }

    fetchAttributeValuesFromId(id: string): Promise<FetchResultSet> {
        return Promise.resolve(undefined);
    }

    fetchIdsFromQBE(qbe: QBE, limit?: number): Promise<string[]> {
        return Promise.resolve([]);
    }

    insertAttributeOfId(id: string, attributeName: string, attributeValue: any): Promise<boolean> {
        return Promise.resolve(false);
    }

    insertAttributesUsingQBE(qbe: QBE, newAttributes: KVP): Promise<boolean> {
        return Promise.resolve(false);
    }

    insertNewObject(kvp: KVP): Promise<boolean> {
        return Promise.resolve(false);
    }

    updateAttributeValueOfId(id: string, attributeName: string, newValue: any): Promise<boolean> {
        return Promise.resolve(false);
    }

    updateAttributeValuesUsingQBE(qbe: QBE, newAttributeValues: KVP): Promise<boolean> {
        return Promise.resolve(false);
    }
}

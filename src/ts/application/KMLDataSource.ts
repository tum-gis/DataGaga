class KMLDataSource extends XMLDataSource {
    private _useOwnKmlParser: boolean;

    constructor(signInController, options) {
        super(signInController, options);
        this._useOwnKmlParser = false;
    }

    responseToKvp(response: any): Map<string, string> {
        if (this._useOwnKmlParser) {
            return this.responseOwnToKvp(response);
        }

        if (this._thirdPartyHandler) {
            switch (this._thirdPartyHandler.type) {
                case ThirdPartyHandler.Cesium: {
                    // the handler is Cesium.KMLDataSource
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

    countFromResult(res: QueryResult): number {
        return res.getSize();
    }

    deleteDataRecordUsingId(id: string): boolean {
        // TODO
        return null;
    }

    fetchIdsFromResult(res: QueryResult): string[] {
        // TODO
        return null;
    }

    insertDataRecord(record: DataRecord): boolean {
        // TODO
        return null;
    }

    queryUsingIds(ids: string[]): QueryResult {
        // TODO
        return null;
    }

    queryUsingNames(names: string[], limit: number): QueryResult {
        // TODO
        return null;
    }

    queryUsingId(id: string, callback: (queryResult: any) => any, limit?: number): void {
        if (this._thirdPartyHandler) {
            // prioritize the implementation of the provided 3rd-party handler
            switch (this._thirdPartyHandler.type) {
                case ThirdPartyHandler.Cesium: {
                    // the handler is Cesium.KMLDataSource
                    let entities = this._thirdPartyHandler.handler.entities;
                    let entity = entities.getById(id);
                    // entity is Cesium.KMLFeatureData
                    let extendedData = entity.kml.extendedData;
                    if (typeof extendedData === "undefined"
                        || (Object.keys(extendedData).length === 0 && extendedData.constructor === Object)) {
                        // empty response -> use custom implementation
                        this.queryUsingIdCustom(id, callback);
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

    private queryUsingIdCustom(id: string, callback: (queryResult: any) => any, limit?: number): void {
        this._useOwnKmlParser = true;
        // read KML file
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let xmlParser = new DOMParser();
                let xmlDoc = xmlParser.parseFromString(xhttp.responseText, "text/xml");
                let placemark = xmlDoc.getElementById(id);
                let extendedData = placemark.getElementsByTagName('ExtendedData')[0];
                let schemaData = extendedData.getElementsByTagName('SchemaData')[0];
                let simpleDataList = schemaData.getElementsByTagName('SimpleData');
                // return XML DOM element
                callback(simpleDataList);
            }
        };
        // TODO enable proxy for other Data Sources?
        xhttp.open("GET", this._proxyPrefix + this._uri, true);
        xhttp.send();
    }

    queryUsingSql(sql: string, callback: (queryResult: any) => any, limit?: number): void {
        // TODO
        return;
    }

    queryUsingTypes(types: string[], limit: number): QueryResult {
        // TODO
        return null;
    }

    sumFromResultByColIndex(res: QueryResult, colIndex: number): number {
        // TODO
        return null;
    }

    sumFromResultByName(res: QueryResult, name: string): number {
        // TODO
        return null;
    }

    updateDataRecordUsingId(id: string, newRecord: DataRecord): boolean {
        // TODO
        return null;
    }

    get useOwnKmlParser(): boolean {
        return this._useOwnKmlParser;
    }

    set useOwnKmlParser(value: boolean) {
        this._useOwnKmlParser = value;
    }
}
class KMLDataSource extends XMLDataSource {
    constructor(signInController, options) {
        super(signInController, options);
    }

    responseToKvp(response: any): Map<string, string> {
        if (this._thirdPartyHandler) {
            switch(this._thirdPartyHandler.type) {
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
        // response is already in JSON
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
        // TODO
        return null;
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

    queryUsingId(id: string, callback: (queryResult: string) => any, limit?: number): void {
        if (this._thirdPartyHandler) {
            // prioritize the implementation of the provided 3rd-party handler
            switch(this._thirdPartyHandler.type) {
                case ThirdPartyHandler.Cesium: {
                    // the handler is Cesium.KMLDataSource
                    let entities = this._thirdPartyHandler.handler.entities;
                    let entity = entities.getById(id);
                    // entity is Cesium.KMLFeatureData
                    callback(entity.kml.extendedData);
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
            // TODO
        }
    }

    queryUsingSql(sql: string, callback: (queryResult: string) => any, limit?: number): void {
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

}
// import * as request from "request-promise-native";

class PostgreSQL extends SQLDataSource {
    constructor(options) {
        super(options);
    }

    responseToKvp(response: any): Map<string, string> {
        // TODO test with PostgREST
        // response is just a text -> parse to JSON
        const responseJson = JSON.parse(response);
        let result = new Map<string, string>();;

        for (let i = 0; i < responseJson.length; i++) {
            const ele = responseJson[i];
            for (let key in ele) {
                result[key] = ele[key];
            }
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

    queryUsingId(id: string, callback: (queryResult: string) => any, limit?:number): void {
        // TODO handle sql
        this.queryUsingSql("", callback,!limit ? Number.MAX_VALUE : limit);
    }

    queryUsingSql(sql: string, callback: (queryResult: string) => any, limit?: number): void {
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
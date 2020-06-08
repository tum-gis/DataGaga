// import * as request from "request-promise-native";

class PostgreSQL extends SQLDataSource {
    constructor(signInController, options) {
        super(signInController, options);
        this._idColName = !options.idColName ? "gmlid" : options.idColName;
    }

    responseToKvp(response: any): Map<string, string> {
        // TODO test with PostgREST
        // response is just a text -> parse to JSON
        const responseJson = JSON.parse(response);
        let result = new Map<string, string>();

        if (this.tableType == TableTypes.Horizontal) {
            // all attributes per object are stored in one row
            for (let i = 0; i < responseJson.length; i++) {
                const ele = responseJson[i];
                for (let key in ele) {
                    result[key] = ele[key];
                }
            }
        } else {
            // one attribute per row
            // only store id once
            // (because the vertical table has multiple lines of the same id)
            // result[this.idColName] = responseJson[0][this.idColName];

            for (let i = 0; i < responseJson.length; i++) {
                const ele = responseJson[i];
                // TODO generic implementation for attribute and value
                result[ele.attribute] = ele.value;
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

    queryUsingId(id: string, callback: (queryResult: any) => any, limit?: number): void {
        // TODO use column number instead of column name (such as gmlid here)
        this.queryUsingSql("?" + this.idColName + "=eq." + id, callback, !limit ? Number.MAX_VALUE : limit);
    }

    queryUsingSql(sql: string, callback: (queryResult: any) => any, limit?: number): void {
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
// import * as request from "request-promise-native";

class GoogleSheets extends SQLDataSource {
    private _spreadsheetId: string;
    private _ranges: string[];

    private _apiKey: string;
    // OAuth
    private _clientId: string;
    // Authorize using one of the following scopes:
    // 'https://www.googleapis.com/auth/drive'
    // 'https://www.googleapis.com/auth/drive.file'
    // 'https://www.googleapis.com/auth/drive.readonly'
    // 'https://www.googleapis.com/auth/spreadsheets'
    // 'https://www.googleapis.com/auth/spreadsheets.readonly'
    private _scope: string;

    private _gapi: any;

    constructor(options, gapi?) {
        super(options);
        this._spreadsheetId = options.spreadsheetId;
        // take the entire first sheet using default name 'Sheet1' if no range is provided
        // more information on the A1 notation:
        // https://developers.google.com/sheets/api/guides/concepts#a1_notation
        this._ranges = !options.ranges ? (["'Sheet1'"]) : options.ranges;
        this._apiKey = options.apiKey;
        this._clientId = !options.clientId ? '' : options.clientId;
        this._scope = !options.scope ? 'https://www.googleapis.com/auth/spreadsheets' : options.scope;
        this._gapi = gapi;
    }

    responseToKvp(response: any): any {
        let result = {};

        // momentarily consider all sheets of this spreadsheet
        // TODO look at this._ranges and find the declared sheets and ranges
        for (let i = 0; i < response.sheets.length; i++) {
            let sheetData = response.sheets[i].data;
            for (let j = 0; j < sheetData.length; j++) {
                let row = sheetData[j].rowData;
                for (let k = 0; k < row.length; k++) {
                    let rowValues = row[k].values;
                    const key = rowValues[0].effectiveValue.stringValue;
                    const value = rowValues[1].effectiveValue.stringValue;
                    result[key] = value;
                }
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

    queryUsingSql(sql: string, limit: number, callback: (queryResult: string) => any): void {
        // TODO handle sql query and limit

        const scope = this;
        handleClientLoad(callback);

        function handleClientLoad(callback: (queryResult: string) => any) {
            scope._gapi.load('client:auth2', initClient);

            function initClient() {
                scope._gapi.client.init({
                    'apiKey': scope._apiKey,
                    'clientId': scope._clientId,
                    'scope': scope._scope,
                    'discoveryDocs': [scope._uri],
                }).then(function () {
                    if (scope._gapi.auth2.getAuthInstance() && scope._gapi.auth2.getAuthInstance().isSignedIn) {
                        // OAuth credentials available
                        scope._gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
                        updateSignInStatus(scope._gapi.auth2.getAuthInstance().isSignedIn.get());
                    } else {
                        // no sign-in required?
                        makeApiCall();
                    }
                });

                function updateSignInStatus(isSignedIn) {
                    if (isSignedIn) {
                        makeApiCall();
                    }
                }

                function handleSignInClick(event) {
                    scope._gapi.auth2.getAuthInstance().signIn();
                }

                function handleSignOutClick(event) {
                    scope._gapi.auth2.getAuthInstance().signOut();
                }

                function makeApiCall() {
                    const params = {
                        // The spreadsheet to request.
                        spreadsheetId: scope._spreadsheetId,

                        // The ranges to retrieve from the spreadsheet.
                        ranges: scope._ranges,  // TODO: Update placeholder value.

                        // True if grid data should be returned.
                        // This parameter is ignored if a field mask was set in the request.
                        includeGridData: true
                    };

                    const request = scope._gapi.client.sheets.spreadsheets.get(params);
                    request.then(function (response) {
                        callback(response.result);
                    }, function (reason) {
                        console.error('error: ' + reason.result.error.message);
                    });
                }
            }
        }
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

    get spreadsheetId(): string {
        return this._spreadsheetId;
    }

    set spreadsheetId(value: string) {
        this._spreadsheetId = value;
    }

    get ranges(): string[] {
        return this._ranges;
    }

    set ranges(value: string[]) {
        this._ranges = value;
    }

    get apiKey(): string {
        return this._apiKey;
    }

    set apiKey(value: string) {
        this._apiKey = value;
    }

    get clientId(): string {
        return this._clientId;
    }

    set clientId(value: string) {
        this._clientId = value;
    }

    get scope(): string {
        return this._scope;
    }

    set scope(value: string) {
        this._scope = value;
    }

    get gapi() {
        return this._gapi;
    }

    set gapi(value) {
        this._gapi = value;
    }
}
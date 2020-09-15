class GoogleSheets extends SQLDataSource implements ReadableDataSource, WritableDataSource, SecuredDataSource {
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

    private _signInController: any;

    private _idColName: string;

    constructor(signInController, options, gapi?) {
        super(options);
        this._signInController = signInController;

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

        this._spreadsheetId = options.uri.replace(/.+?(spreadsheets\/d\/)/, "").replace(/(?=\/edit).+/, "");
        // take the entire first sheet using default name 'Sheet1' if no range is provided
        // more information on the A1 notation:
        // https://developers.google.com/sheets/api/guides/concepts#a1_notation
        this._ranges = !options.ranges ? (["'Sheet1'"]) : options.ranges;
        this._apiKey = options.apiKey;
        this._clientId = !options.clientId ? '' : options.clientId;
        this._scope = !options.scope ? 'https://www.googleapis.com/auth/spreadsheets' : options.scope;
        this._gapi = gapi;
        this._idColName = !options.idColName ? "A" : options.idColName;
        this._signInController = signInController;
    }

    fetchAttributeValuesFromId(id: string): Promise<FetchResultSet> {
        throw new Error("Method not implemented.");
    }

    fetchAttributeNamesFromId(id: string): Promise<string[]> {
        throw new Error("Method not implemented.");
    }

    fetchIdsFromQBE(qbe: QBE, limit?: number): Promise<string[]> {
        throw new Error("Method not implemented.");
    }

    aggregateByIds(ids: string[], aggregateOperator: AggregateOperator, attributeName: string): Promise<number>;
    aggregateByIds(ids: string[], aggregateOperator: AggregateOperator): Promise<{ kvp: KVP }>;
    aggregateByIds(ids: string[], aggregateOperator: AggregateOperator, attributeName?: string): Promise<number> | Promise<{ kvp: KVP }> {
        // TODO
        return Promise.resolve(0);
    }

    responseToKvp(response: any): Map<string, string> {
        let result = new Map<string, string>();
        const rows = response.table.rows;
        const cols = response.table.cols;

        if (rows[0] && rows[0].c) {
            // Structure of the JSON response from Google Visualization API
            // https://developers.google.com/chart/interactive/docs/reference#dataparam
            // Ignore the first column (containing ID) --> start i with 1 instead of 0
            if (this.dataStructureType == DataStructureType.HORIZONTAL) {
                for (let i = 1; i < rows[0].c.length; i++) {
                    const key = cols[i].label;
                    const value = rows[0].c[i] ? rows[0].c[i].v : undefined;
                    result[key] = value;
                }
            } else {
                // one attribute per row
                // only store id once
                // (because the vertical table has multiple lines of the same id)
                // assuming id is in the first column
                // result[this.idColName] = rows[0].c[0].v;

                for (let i = 1; i < rows.length; i++) {
                    // TODO generic implemetation for fields id (c[0]) attribute (c[1]) and value (c[2])
                    const key = rows[i].c[1].v;
                    const value = rows[i].c[2].v;
                    result[key] = value;
                }
            }
        }

        return result;
    }

    // This function is implemented for handling response from Google Sheets API
    responseToKvp_OLD(response: any): Map<string, string> {
        // TODO refactor
        let result = new Map<string, string>();

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

    queryUsingId(id: string, callback: (queryResult: any) => any, limit?: number, clickedObject?: any): void {
        this.queryUsingSql("SELECT * WHERE A='" + id + "'", callback, !limit ? Number.MAX_VALUE : limit, clickedObject);
    }

    queryUsingSql(sql: string, callback: (queryResult: any) => any, limit?: number, clickedObject?: any): void {
        // TODO handle limit
        const baseUrl = "https://docs.google.com/spreadsheets/d/";

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var queryResult = xmlHttp.responseText;
                // The response is in JSON but contains the following string:
                // "/*O_o*/google.visualization.Query.setResponse({status:ok, ...})"
                // https://developers.google.com/chart/interactive/docs/dev/implementing_data_source#jsondatatable
                // The Google Visualization API is used here for querying data from Google Spreadsheets
                // https://developers.google.com/chart/interactive/docs/querylanguage#setting-the-query-in-the-data-source-url
                callback(JSON.parse(queryResult.replace("/*O_o*/", "").replace(/(google\.visualization\.Query\.setResponse\(|\);$)/g, "")));
            }
        };
        xmlHttp.open("GET", baseUrl + this._spreadsheetId + "/gviz/tq?tq=" + encodeURI(sql), true); // true for asynchronous
        if (this._signInController != null) {
            xmlHttp.setRequestHeader('Authorization', 'Bearer ' + this._signInController.accessToken);
        }
        xmlHttp.send(null);
    }

    // This function is implemented using gapi
    queryUsingSql_OLD(sql: string, limit: number, callback: (queryResult: any) => any): void {
        // TODO refactor
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

                function makeApiCall() {
                    const params = {
                        // The spreadsheet to request.
                        "spreadsheetId": scope._spreadsheetId,

                        "requests": [
                            {
                                "addFilterView": {
                                    "filter": {
                                        // "filterViewId": 1234567890,
                                        "title": "A Filter",
                                        "range": {
                                            "sheetId": 0,
                                            "startRowIndex": 0,
                                            //"endRowIndex": 5,
                                            "startColumnIndex": 0,
                                            //"endColumnIndex": 2
                                        },
                                        // "namedRangeId": string,
                                        // 'sortSpecs': [{
                                        //     'dimensionIndex': 3,
                                        //     'sortOrder': 'ASCENDING'
                                        // }],
                                        "criteria": {
                                            0: {
                                                "condition": {
                                                    "type": "TEXT_EQ",
                                                    "values": [
                                                        {
                                                            "userEnteredValue": "A"
                                                        }
                                                    ]
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        ],
                        "includeSpreadsheetInResponse": true,
                        // "responseRanges": ["'Sheet1'!A1:C5"],
                        "responseIncludeGridData": true




                        // The ranges to retrieve from the spreadsheet.
                        // "ranges": scope._ranges,


                        // True if grid data should be returned.
                        // This parameter is ignored if a field mask was set in the request.
                        // includeGridData: true
                    };

                    const request = scope._gapi.client.sheets.spreadsheets.batchUpdate(params);
                    request.then(function (response) {
                        callback(response.result);
                    }, function (reason) {
                        console.error('error: ' + reason.result.error.message);
                    });
                }
            }
        }
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

    get signInController() {
        return this._signInController;
    }

    set signInController(value: any) {
        this._signInController = value;
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

    insertAttributeOfId(id: string, attributeName: string, attributeValue: any): Promise<boolean> {
        return Promise.resolve(false);
    }

    insertAttributesUsingQBE(qbe: QBE, newAttributes: KVP): Promise<boolean> {
        return Promise.resolve(false);
    }

    insertNewObject(kvp: KVP): Promise<boolean> {
        return Promise.resolve(false);
    }

    login(credentials: any): Promise<boolean> {
        return Promise.resolve(false);
    }

    logout(): Promise<boolean> {
        return Promise.resolve(false);
    }

    updateAttributeValueOfId(id: string, attributeName: string, newValue: any): Promise<boolean> {
        return Promise.resolve(false);
    }

    updateAttributeValuesUsingQBE(qbe: QBE, newAttributeValues: KVP): Promise<boolean> {
        return Promise.resolve(false);
    }
}

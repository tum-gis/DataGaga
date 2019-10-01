// import * as request from "request-promise-native";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GoogleSheets = /** @class */ (function (_super) {
    __extends(GoogleSheets, _super);
    function GoogleSheets(options, gapi) {
        var _this = _super.call(this, options) || this;
        _this._spreadsheetId = options.spreadsheetId;
        // take the entire first sheet using default name 'Sheet1' if no range is provided
        // more information on the A1 notation:
        // https://developers.google.com/sheets/api/guides/concepts#a1_notation
        _this._ranges = !options.ranges ? (["'Sheet1'"]) : options.ranges;
        _this._apiKey = options.apiKey;
        _this._clientId = !options.clientId ? '' : options.clientId;
        _this._scope = !options.scope ? 'https://www.googleapis.com/auth/spreadsheets' : options.scope;
        _this._gapi = gapi;
        return _this;
    }
    GoogleSheets.prototype.responseToKvp = function (response) {
        var result = {};
        // momentarily consider all sheets of this spreadsheet
        // TODO look at this._ranges and find the declared sheets and ranges
        for (var i = 0; i < response.sheets.length; i++) {
            var sheetData = response.sheets[i].data;
            for (var j = 0; j < sheetData.length; j++) {
                var row = sheetData[j].rowData;
                for (var k = 0; k < row.length; k++) {
                    var rowValues = row[k].values;
                    var key = rowValues[0].effectiveValue.stringValue;
                    var value = rowValues[1].effectiveValue.stringValue;
                    result[key] = value;
                }
            }
        }
        return result;
    };
    GoogleSheets.prototype.countFromResult = function (res) {
        return res.getSize();
    };
    GoogleSheets.prototype.deleteDataRecordUsingId = function (id) {
        // TODO
        return null;
    };
    GoogleSheets.prototype.fetchIdsFromResult = function (res) {
        // TODO
        return null;
    };
    GoogleSheets.prototype.insertDataRecord = function (record) {
        // TODO
        return null;
    };
    GoogleSheets.prototype.queryUsingIds = function (ids) {
        // TODO
        return null;
    };
    GoogleSheets.prototype.queryUsingNames = function (names, limit) {
        // TODO
        return null;
    };
    GoogleSheets.prototype.queryUsingSql = function (sql, limit, callback) {
        // TODO handle sql query and limit
        var scope = this;
        handleClientLoad(callback);
        function handleClientLoad(callback) {
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
                    }
                    else {
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
                    var params = {
                        // The spreadsheet to request.
                        spreadsheetId: scope._spreadsheetId,
                        // The ranges to retrieve from the spreadsheet.
                        ranges: scope._ranges,
                        // True if grid data should be returned.
                        // This parameter is ignored if a field mask was set in the request.
                        includeGridData: true
                    };
                    var request = scope._gapi.client.sheets.spreadsheets.get(params);
                    request.then(function (response) {
                        callback(response.result);
                    }, function (reason) {
                        console.error('error: ' + reason.result.error.message);
                    });
                }
            }
        }
    };
    GoogleSheets.prototype.queryUsingTypes = function (types, limit) {
        // TODO
        return null;
    };
    GoogleSheets.prototype.sumFromResultByColIndex = function (res, colIndex) {
        // TODO
        return null;
    };
    GoogleSheets.prototype.sumFromResultByName = function (res, name) {
        // TODO
        return null;
    };
    GoogleSheets.prototype.updateDataRecordUsingId = function (id, newRecord) {
        // TODO
        return null;
    };
    Object.defineProperty(GoogleSheets.prototype, "spreadsheetId", {
        get: function () {
            return this._spreadsheetId;
        },
        set: function (value) {
            this._spreadsheetId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleSheets.prototype, "ranges", {
        get: function () {
            return this._ranges;
        },
        set: function (value) {
            this._ranges = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleSheets.prototype, "apiKey", {
        get: function () {
            return this._apiKey;
        },
        set: function (value) {
            this._apiKey = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleSheets.prototype, "clientId", {
        get: function () {
            return this._clientId;
        },
        set: function (value) {
            this._clientId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleSheets.prototype, "scope", {
        get: function () {
            return this._scope;
        },
        set: function (value) {
            this._scope = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleSheets.prototype, "gapi", {
        get: function () {
            return this._gapi;
        },
        set: function (value) {
            this._gapi = value;
        },
        enumerable: true,
        configurable: true
    });
    return GoogleSheets;
}(SQLDataSource));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../core/FirstNormalFormDataSource", "../core/FetchResultSet", "../util/WebUtil"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GoogleSheets = void 0;
    var FirstNormalFormDataSource_1 = require("../core/FirstNormalFormDataSource");
    var FetchResultSet_1 = require("../core/FetchResultSet");
    var WebUtil_1 = require("../util/WebUtil");
    var GoogleSheets = (function (_super) {
        __extends(GoogleSheets, _super);
        function GoogleSheets(options) {
            var _this = _super.call(this, options) || this;
            var capabilitiesOptions = {
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
            };
            _this._capabilities = capabilitiesOptions;
            _this._dataSourceType = "GoogleSheets";
            _this._spreadsheetId = options.uri.replace(/.+?(spreadsheets\/d\/)/, "").replace(/(?=\/edit).+/, "");
            _this._a1Notation = (options.a1Notation == null) ? "A" : options.a1Notation;
            return _this;
        }
        GoogleSheets.prototype.getMetaData = function () {
            var scope = this;
            return new Promise(function (resolve, reject) {
                WebUtil_1.WebUtil.httpGet(GoogleSheets.apiUrlPrefix + scope._spreadsheetId + "?&fields=sheets.properties").then(function (result) {
                    resolve(result);
                }).catch(function (error) {
                    reject(error);
                });
            });
        };
        GoogleSheets.prototype.fetchAttributeValuesFromId = function (id) {
            var scope = this;
            return new Promise(function (resolve, reject) {
                var baseUrl = "https://docs.google.com/spreadsheets/d/";
                var sql = "SELECT * WHERE A='" + id + "'";
                WebUtil_1.WebUtil.httpGet(baseUrl + scope._spreadsheetId + "/gviz/tq?tq=" + encodeURI(sql)).then(function (result) {
                    var jsonResult = JSON.parse(result.replace("/*O_o*/", "").replace(/(google\.visualization\.Query\.setResponse\(|\);$)/g, ""));
                    var cols = jsonResult.table.cols;
                    var rows = jsonResult.table.rows;
                    var fetchResultSet = new FetchResultSet_1.FetchResultSet([]);
                    var keys = [];
                    for (var i = 0; i < cols.length; i++) {
                        keys[i] = cols[i].label.split(" ")[0];
                    }
                    for (var i = 0; i < rows.length; i++) {
                        var kvp = {};
                        for (var j = 0; j < rows[i].c.length; j++) {
                            kvp[keys[j]] = rows[i].c[j] == null ? "" : rows[i].c[j]["v"];
                        }
                        fetchResultSet.push(kvp);
                    }
                    resolve(fetchResultSet);
                }).catch(function (error) {
                    reject(error);
                });
            });
        };
        GoogleSheets.prototype.fetchAttributeNamesFromId = function (id) {
            throw new Error("Method not implemented.");
        };
        GoogleSheets.prototype.fetchIdsFromQBE = function (qbe, limit) {
            throw new Error("Method not implemented.");
        };
        GoogleSheets.prototype.fetchIdsFromQBEs = function (qbes, limit) {
            throw new Error("Method not implemented.");
        };
        GoogleSheets.prototype.aggregateByIds = function (ids, aggregateOperator, attributeName) {
            throw new Error("Method not implemented.");
        };
        Object.defineProperty(GoogleSheets.prototype, "spreadsheetId", {
            get: function () {
                return this._spreadsheetId;
            },
            set: function (value) {
                this._spreadsheetId = value;
            },
            enumerable: false,
            configurable: true
        });
        GoogleSheets.prototype.deleteAttributeOfId = function (id, attributeName) {
            throw new Error("Method not implemented.");
        };
        GoogleSheets.prototype.deleteAttributesUsingQBE = function (qbe, attributeNames) {
            throw new Error("Method not implemented.");
        };
        GoogleSheets.prototype.deleteObjectOfId = function (id) {
            throw new Error("Method not implemented.");
        };
        GoogleSheets.prototype.deleteObjectsUsingQBE = function (qbe) {
            throw new Error("Method not implemented.");
        };
        GoogleSheets.prototype.insertAttributeOfId = function (id, attributeName, attributeValue) {
            throw new Error("Method not implemented.");
        };
        GoogleSheets.prototype.insertAttributesUsingQBE = function (qbe, newAttributes) {
            throw new Error("Method not implemented.");
        };
        GoogleSheets.prototype.insertNewObject = function (json) {
            throw new Error("Method not implemented.");
        };
        GoogleSheets.prototype.login = function (credentials) {
            throw new Error("Method not implemented.");
        };
        GoogleSheets.prototype.logout = function () {
            throw new Error("Method not implemented.");
        };
        GoogleSheets.prototype.updateAttributeValueOfId = function (id, attributeName, newValue) {
            throw new Error("Method not implemented.");
        };
        GoogleSheets.prototype.updateAttributeValuesUsingQBE = function (qbe, newAttributeValues) {
            throw new Error("Method not implemented.");
        };
        GoogleSheets.apiUrlPrefix = "https://sheets.googleapis.com/v4/spreadsheets/";
        return GoogleSheets;
    }(FirstNormalFormDataSource_1.FirstNormalFormDataSource));
    exports.GoogleSheets = GoogleSheets;
});
//# sourceMappingURL=GoogleSheets.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleSheets = void 0;
const FirstNormalFormDataSource_1 = require("../core/FirstNormalFormDataSource");
const FetchResultSet_1 = require("../core/FetchResultSet");
const axios_1 = require("axios");
class GoogleSheets extends FirstNormalFormDataSource_1.FirstNormalFormDataSource {
    constructor(options) {
        super(options);
        let capabilitiesOptions = {
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
        this._capabilities = capabilitiesOptions;
        this._dataSourceType = "GoogleSheets";
        this._spreadsheetId = options.uri.replace(/.+?(spreadsheets\/d\/)/, "").replace(/(?=\/edit).+/, "");
        this._a1Notation = (options.a1Notation == null) ? "A" : options.a1Notation;
    }
    getMetaData() {
        let scope = this;
        return new Promise(function (resolve, reject) {
            axios_1.default.get(GoogleSheets.apiUrlPrefix + scope._spreadsheetId + "?&fields=sheets.properties").then(function (result) {
                resolve(result.data);
            }).catch(function (error) {
                reject(error);
            });
        });
    }
    fetchAttributeValuesFromId(id) {
        let scope = this;
        return new Promise(function (resolve, reject) {
            let baseUrl = "https://docs.google.com/spreadsheets/d/";
            let sql = "SELECT * WHERE A='" + id + "'";
            axios_1.default.get(baseUrl + scope._spreadsheetId + "/gviz/tq?tq=" + encodeURI(sql)).then(function (result) {
                let jsonResult = JSON.parse(result.data.replace("/*O_o*/", "").replace(/(google\.visualization\.Query\.setResponse\(|\);$)/g, ""));
                let cols = jsonResult.table.cols;
                let rows = jsonResult.table.rows;
                let fetchResultSet = new FetchResultSet_1.FetchResultSet([]);
                let keys = [];
                for (let i = 0; i < cols.length; i++) {
                    keys[i] = cols[i].label.split(" ")[0];
                }
                for (let i = 0; i < rows.length; i++) {
                    let kvp = {};
                    for (let j = 0; j < rows[i].c.length; j++) {
                        kvp[keys[j]] = rows[i].c[j] == null ? "" : rows[i].c[j]["v"];
                    }
                    fetchResultSet.push(kvp);
                }
                resolve(fetchResultSet);
            }).catch(function (error) {
                reject(error);
            });
        });
    }
    fetchAttributeNamesFromId(id) {
        throw new Error("Method not implemented.");
    }
    fetchIdsFromQBE(qbe, limit) {
        throw new Error("Method not implemented.");
    }
    fetchIdsFromQBEs(qbes, limit) {
        throw new Error("Method not implemented.");
    }
    aggregateByIds(ids, aggregateOperator, attributeName) {
        throw new Error("Method not implemented.");
    }
    get spreadsheetId() {
        return this._spreadsheetId;
    }
    set spreadsheetId(value) {
        this._spreadsheetId = value;
    }
    deleteAttributeOfId(id, attributeName) {
        throw new Error("Method not implemented.");
    }
    deleteAttributesUsingQBE(qbe, attributeNames) {
        throw new Error("Method not implemented.");
    }
    deleteObjectOfId(id) {
        throw new Error("Method not implemented.");
    }
    deleteObjectsUsingQBE(qbe) {
        throw new Error("Method not implemented.");
    }
    insertAttributeOfId(id, attributeName, attributeValue) {
        throw new Error("Method not implemented.");
    }
    insertAttributesUsingQBE(qbe, newAttributes) {
        throw new Error("Method not implemented.");
    }
    insertNewObject(json) {
        throw new Error("Method not implemented.");
    }
    login(credentials) {
        throw new Error("Method not implemented.");
    }
    logout() {
        throw new Error("Method not implemented.");
    }
    updateAttributeValueOfId(id, attributeName, newValue) {
        throw new Error("Method not implemented.");
    }
    updateAttributeValuesUsingQBE(qbe, newAttributeValues) {
        throw new Error("Method not implemented.");
    }
}
exports.GoogleSheets = GoogleSheets;
GoogleSheets.apiUrlPrefix = "https://sheets.googleapis.com/v4/spreadsheets/";

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgreSQL = void 0;
const FirstNormalFormDataSource_1 = require("../core/FirstNormalFormDataSource");
const FetchResultSet_1 = require("../core/FetchResultSet");
const axios_1 = require("axios");
class PostgreSQL extends FirstNormalFormDataSource_1.FirstNormalFormDataSource {
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
        this._dataSourceType = "PostgreSQL";
        this._idColName = (options.idColName == null) ? "gmlid" : options.idColName;
    }
    login(credentials) {
        throw new Error("Method not implemented.");
    }
    logout() {
        throw new Error("Method not implemented.");
    }
    getMetaData() {
        throw new Error("Method not implemented.");
    }
    aggregateByIds(ids, aggregateOperator, attributeName) {
        throw new Error("Method not implemented.");
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
    fetchAttributeNamesFromId(id) {
        throw new Error("Method not implemented.");
    }
    fetchAttributeValuesFromId(id) {
        let scope = this;
        return new Promise(function (resolve, reject) {
            axios_1.default.get(scope._uri + "?" + scope._idColName + "=eq." + id).then(function (result) {
                let fetchResultSet = new FetchResultSet_1.FetchResultSet(result.data);
                resolve(fetchResultSet);
            }).catch(function (error) {
                reject(error);
            });
        });
    }
    fetchIdsFromQBE(qbe, limit) {
        throw new Error("Method not implemented.");
    }
    fetchIdsFromQBEs(qbes, limit) {
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
    updateAttributeValueOfId(id, attributeName, newValue) {
        throw new Error("Method not implemented.");
    }
    updateAttributeValuesUsingQBE(qbe, newAttributeValues) {
        throw new Error("Method not implemented.");
    }
}
exports.PostgreSQL = PostgreSQL;

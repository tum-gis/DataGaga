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
    exports.PostgreSQL = void 0;
    var FirstNormalFormDataSource_1 = require("../core/FirstNormalFormDataSource");
    var FetchResultSet_1 = require("../core/FetchResultSet");
    var WebUtil_1 = require("../util/WebUtil");
    var PostgreSQL = (function (_super) {
        __extends(PostgreSQL, _super);
        function PostgreSQL(options) {
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
            _this._dataSourceType = "PostgreSQL";
            _this._idColName = (options.idColName == null) ? "gmlid" : options.idColName;
            return _this;
        }
        PostgreSQL.prototype.login = function (credentials) {
            throw new Error("Method not implemented.");
        };
        PostgreSQL.prototype.logout = function () {
            throw new Error("Method not implemented.");
        };
        PostgreSQL.prototype.getMetaData = function () {
            throw new Error("Method not implemented.");
        };
        PostgreSQL.prototype.aggregateByIds = function (ids, aggregateOperator, attributeName) {
            throw new Error("Method not implemented.");
        };
        PostgreSQL.prototype.deleteAttributeOfId = function (id, attributeName) {
            throw new Error("Method not implemented.");
        };
        PostgreSQL.prototype.deleteAttributesUsingQBE = function (qbe, attributeNames) {
            throw new Error("Method not implemented.");
        };
        PostgreSQL.prototype.deleteObjectOfId = function (id) {
            throw new Error("Method not implemented.");
        };
        PostgreSQL.prototype.deleteObjectsUsingQBE = function (qbe) {
            throw new Error("Method not implemented.");
        };
        PostgreSQL.prototype.fetchAttributeNamesFromId = function (id) {
            throw new Error("Method not implemented.");
        };
        PostgreSQL.prototype.fetchAttributeValuesFromId = function (id) {
            var scope = this;
            return new Promise(function (resolve, reject) {
                WebUtil_1.WebUtil.httpGet(scope._uri + "?" + scope._idColName + "=eq." + id).then(function (result) {
                    var fetchResultSet = new FetchResultSet_1.FetchResultSet(result);
                    resolve(fetchResultSet);
                }).catch(function (error) {
                    reject(error);
                });
            });
        };
        PostgreSQL.prototype.fetchIdsFromQBE = function (qbe, limit) {
            throw new Error("Method not implemented.");
        };
        PostgreSQL.prototype.fetchIdsFromQBEs = function (qbes, limit) {
            throw new Error("Method not implemented.");
        };
        PostgreSQL.prototype.insertAttributeOfId = function (id, attributeName, attributeValue) {
            throw new Error("Method not implemented.");
        };
        PostgreSQL.prototype.insertAttributesUsingQBE = function (qbe, newAttributes) {
            throw new Error("Method not implemented.");
        };
        PostgreSQL.prototype.insertNewObject = function (json) {
            throw new Error("Method not implemented.");
        };
        PostgreSQL.prototype.updateAttributeValueOfId = function (id, attributeName, newValue) {
            throw new Error("Method not implemented.");
        };
        PostgreSQL.prototype.updateAttributeValuesUsingQBE = function (qbe, newAttributeValues) {
            throw new Error("Method not implemented.");
        };
        return PostgreSQL;
    }(FirstNormalFormDataSource_1.FirstNormalFormDataSource));
    exports.PostgreSQL = PostgreSQL;
});
//# sourceMappingURL=PostgreSQL.js.map
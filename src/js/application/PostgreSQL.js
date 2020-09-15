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
var PostgreSQL = (function (_super) {
    __extends(PostgreSQL, _super);
    function PostgreSQL(options) {
        var _this = _super.call(this, options) || this;
        var capabilitiesOptions = new DataSourceCapabilities({
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
        _this._capabilities = capabilitiesOptions;
        _this._dataSourceType = DataSourceType.PostgreSQL;
        Util.initAttribute(_this, "_idColName", options.idColName, "gmlid");
        return _this;
    }
    PostgreSQL.prototype.transformToKVPArray = function (data) {
        var dataJson = JSON.parse(data);
        var result = Array();
        if (this._dataStructureType === 0) {
            var kvps = {};
            for (var i = 0; i < dataJson.length; i++) {
                var ele = dataJson[i];
                for (var key in ele) {
                    kvps[key] = ele[key];
                }
            }
            result.push(kvps);
        }
        else {
            for (var i = 0; i < dataJson.length; i++) {
                var ele = dataJson[i];
                result[ele.attribute] = ele.value;
            }
        }
        return result;
    };
    PostgreSQL.prototype.aggregateByIds = function (ids, aggregateOperator, attributeName) {
        return Promise.resolve(0);
    };
    PostgreSQL.prototype.deleteAttributeOfId = function (id, attributeName) {
        return Promise.resolve(false);
    };
    PostgreSQL.prototype.deleteAttributesUsingQBE = function (qbe, attributeNames) {
        return Promise.resolve(false);
    };
    PostgreSQL.prototype.deleteObjectOfId = function (id) {
        return Promise.resolve(false);
    };
    PostgreSQL.prototype.deleteObjectsUsingQBE = function (qbe) {
        return Promise.resolve(false);
    };
    PostgreSQL.prototype.fetchAttributeNamesFromId = function (id) {
        return Promise.resolve([]);
    };
    PostgreSQL.prototype.fetchAttributeValuesFromId = function (id) {
        return new Promise(function (resolve, reject) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", this._uri + "?" + this._idColName + "=eq." + id, true);
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    var fetchResultSet = new FetchResultSet(xmlHttp.responseText);
                    resolve(fetchResultSet);
                }
                else {
                    reject({
                        status: xmlHttp.status,
                        statusText: xmlHttp.statusText
                    });
                }
            };
            xmlHttp.onerror = function () {
                reject({
                    status: xmlHttp.status,
                    statusText: xmlHttp.statusText
                });
            };
            xmlHttp.send(null);
        });
    };
    PostgreSQL.prototype.fetchIdsFromQBE = function (qbe, limit) {
        return Promise.resolve([]);
    };
    PostgreSQL.prototype.insertAttributeOfId = function (id, attributeName, attributeValue) {
        return Promise.resolve(false);
    };
    PostgreSQL.prototype.insertAttributesUsingQBE = function (qbe, newAttributes) {
        return Promise.resolve(false);
    };
    PostgreSQL.prototype.insertNewObject = function (kvp) {
        return Promise.resolve(false);
    };
    PostgreSQL.prototype.updateAttributeValueOfId = function (id, attributeName, newValue) {
        return Promise.resolve(false);
    };
    PostgreSQL.prototype.updateAttributeValuesUsingQBE = function (qbe, newAttributeValues) {
        return Promise.resolve(false);
    };
    return PostgreSQL;
}(SQLDataSource));

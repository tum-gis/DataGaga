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
        define(["require", "exports", "../core/NonFirstNormalFormDataSource", "../core/FetchResultSet", "../util/WebUtil"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.KML = void 0;
    var NonFirstNormalFormDataSource_1 = require("../core/NonFirstNormalFormDataSource");
    var FetchResultSet_1 = require("../core/FetchResultSet");
    var WebUtil_1 = require("../util/WebUtil");
    var KML = (function (_super) {
        __extends(KML, _super);
        function KML(options) {
            var _this = _super.call(this, options) || this;
            var capabilitiesOptions = {
                webCapabilities: {
                    restAPI: false
                },
                dbTransactionCapabilities: {
                    read: true,
                    insert: false,
                    delete: false,
                    update: false
                },
                securityCapabilities: {
                    oauth: false
                }
            };
            _this._capabilities = capabilitiesOptions;
            _this.proxyPrefix = options.proxyPrefix;
            return _this;
        }
        KML.prototype.getMetaData = function () {
            throw new Error("Method not implemented.");
        };
        KML.prototype.aggregateByIds = function (ids, aggregateOperator, attributeName) {
            throw new Error("Method not implemented.");
        };
        KML.prototype.fetchAttributeNamesFromId = function (id) {
            throw new Error("Method not implemented.");
        };
        KML.prototype.fetchAttributeValuesFromId = function (id) {
            var scope = this;
            return new Promise(function (resolve, reject) {
                WebUtil_1.WebUtil.httpGet((scope._uri.indexOf(scope.proxyPrefix) >= 0 ? "" : scope.proxyPrefix) + scope._uri).then(function (result) {
                    var xmlParser = new DOMParser();
                    var xmlDoc = xmlParser.parseFromString(result, "text/xml");
                    var placemark = xmlDoc.getElementById(id);
                    if (placemark == null) {
                        reject("KML Placemark with ID = " + id + " does not exist!");
                        return;
                    }
                    var extendedData = placemark.getElementsByTagName('ExtendedData')[0];
                    var schemaData = extendedData.getElementsByTagName('SchemaData')[0];
                    var simpleDataList = schemaData.getElementsByTagName('SimpleData');
                    var array = [];
                    var kvp = {};
                    kvp["id"] = id;
                    for (var i = 0; i < simpleDataList.length; i++) {
                        var key = simpleDataList[i].getAttribute("name");
                        var value = simpleDataList[i].textContent;
                        if (key != null) {
                            kvp[key] = value;
                        }
                    }
                    array.push(kvp);
                    var fetchResultSet = new FetchResultSet_1.FetchResultSet(array);
                    resolve(fetchResultSet);
                }).catch(function (error) {
                    reject(error);
                });
            });
        };
        KML.prototype.fetchAttributeValuesFromName = function (name) {
            var scope = this;
            return new Promise(function (resolve, reject) {
                WebUtil_1.WebUtil.httpGet((scope._uri.indexOf(scope.proxyPrefix) >= 0 ? "" : scope.proxyPrefix) + scope._uri).then(function (result) {
                    var xmlParser = new DOMParser();
                    var xmlDoc = xmlParser.parseFromString(result, "text/xml");
                    var placemarks = xmlDoc.getElementsByTagName("Placemark");
                    for (var i = 0; i < placemarks.length; i++) {
                        var iPlacemark = placemarks[i];
                        var placemarkName = iPlacemark.getElementsByTagName("name")[0];
                        if (placemarkName.textContent === name) {
                            var extendedData = iPlacemark.getElementsByTagName('ExtendedData')[0];
                            var schemaData = extendedData.getElementsByTagName('SchemaData')[0];
                            var simpleDataList = schemaData.getElementsByTagName('SimpleData');
                            var array = [];
                            var kvp = {};
                            kvp["id"] = name;
                            for (var i_1 = 0; i_1 < simpleDataList.length; i_1++) {
                                var key = simpleDataList[i_1].getAttribute("name");
                                var value = simpleDataList[i_1].textContent;
                                if (key != null) {
                                    kvp[key] = value;
                                }
                            }
                            array.push(kvp);
                            var fetchResultSet = new FetchResultSet_1.FetchResultSet(array);
                            resolve(fetchResultSet);
                        }
                    }
                }).catch(function (error) {
                    reject(error);
                });
            });
        };
        KML.prototype.fetchIdsFromQBE = function (qbe, limit) {
            var scope = this;
            return new Promise(function (resolve, reject) {
                WebUtil_1.WebUtil.httpGet((scope._uri.indexOf(scope.proxyPrefix) >= 0 ? "" : scope.proxyPrefix) + scope._uri).then(function (result) {
                    var xmlParser = new DOMParser();
                    var xmlDoc = xmlParser.parseFromString(result, "text/xml");
                    if (limit == null) {
                        limit = Number.MAX_VALUE;
                    }
                    var array = new Set();
                    var count = 0;
                    var placemarks = xmlDoc.getElementsByTagName("Placemark");
                    switch (qbe.attributeName) {
                        case "id":
                            array = new Set();
                            count = 0;
                            if (++count <= limit) {
                                array.add(qbe.value);
                            }
                            resolve(array);
                            break;
                        case "name":
                            array = new Set();
                            count = 0;
                            for (var i = 0; i < placemarks.length; i++) {
                                var iPlacemark = placemarks[i];
                                var placemarkName = iPlacemark.getElementsByTagName("name")[0];
                                if (placemarkName != null && qbe.assert(placemarkName.textContent)) {
                                    if (++count <= limit) {
                                        var tmpId = iPlacemark.getAttribute("id");
                                        if (tmpId == null) {
                                            tmpId = iPlacemark.getElementsByTagName("name")[0].textContent;
                                        }
                                        if (tmpId == null) {
                                            tmpId = "";
                                        }
                                        array.add(tmpId);
                                    }
                                }
                            }
                            resolve(array);
                            break;
                        case "visibility":
                            array = new Set();
                            count = 0;
                            for (var i = 0; i < placemarks.length; i++) {
                                var iPlacemark = placemarks[i];
                                var placemarkVisibility = iPlacemark.getElementsByTagName("visibility")[0];
                                if (placemarkVisibility != null && qbe.assert(placemarkVisibility.textContent)) {
                                    if (++count <= limit) {
                                        var tmpId = iPlacemark.getAttribute("id");
                                        if (tmpId == null) {
                                            tmpId = iPlacemark.getElementsByTagName("name")[0].textContent;
                                        }
                                        if (tmpId == null) {
                                            tmpId = "";
                                        }
                                        array.add(tmpId);
                                    }
                                }
                            }
                            resolve(array);
                            break;
                        case "simpledata_name":
                            array = new Set();
                            count = 0;
                            for (var i = 0; i < placemarks.length; i++) {
                                var iPlacemark = placemarks[i];
                                var extendedData = iPlacemark.getElementsByTagName('ExtendedData')[0];
                                var schemaData = extendedData.getElementsByTagName('SchemaData')[0];
                                var simpleDataList = schemaData.getElementsByTagName('SimpleData');
                                for (var i_2 = 0; i_2 < simpleDataList.length; i_2++) {
                                    var key = simpleDataList[i_2].getAttribute("name");
                                    if (qbe.assert(key)) {
                                        if (++count <= limit) {
                                            var tmpId = iPlacemark.getAttribute("id");
                                            if (tmpId == null) {
                                                tmpId = iPlacemark.getElementsByTagName("name")[0].textContent;
                                            }
                                            if (tmpId == null) {
                                                tmpId = "";
                                            }
                                            array.add(tmpId);
                                        }
                                        break;
                                    }
                                }
                            }
                            resolve(array);
                            break;
                        case "simpledata_value":
                            array = new Set();
                            count = 0;
                            for (var i = 0; i < placemarks.length; i++) {
                                var iPlacemark = placemarks[i];
                                var extendedData = iPlacemark.getElementsByTagName('ExtendedData')[0];
                                var schemaData = extendedData.getElementsByTagName('SchemaData')[0];
                                var simpleDataList = schemaData.getElementsByTagName('SimpleData');
                                for (var i_3 = 0; i_3 < simpleDataList.length; i_3++) {
                                    var value = simpleDataList[i_3].textContent;
                                    if (qbe.assert(value)) {
                                        if (++count <= limit) {
                                            var tmpId = iPlacemark.getAttribute("id");
                                            if (tmpId == null) {
                                                tmpId = iPlacemark.getElementsByTagName("name")[0].textContent;
                                            }
                                            if (tmpId == null) {
                                                tmpId = "";
                                            }
                                            array.add(tmpId);
                                        }
                                        break;
                                    }
                                }
                            }
                            resolve(array);
                            break;
                        default:
                            reject("Could not assert " + qbe.toString() + ".");
                    }
                    reject("Could not assert " + qbe.toString() + ".");
                }).catch(function (error) {
                    reject(error);
                });
            });
        };
        KML.prototype.fetchIdsFromQBEs = function (qbes, limit) {
            var scope = this;
            if (limit == null) {
                limit = Number.MAX_VALUE;
            }
            return new Promise(function (resolve, reject) {
                var array = new Set();
                for (var _i = 0, qbes_1 = qbes; _i < qbes_1.length; _i++) {
                    var qbe = qbes_1[_i];
                    scope.fetchIdsFromQBE(qbe).then(function (result) {
                        result.forEach(array.add, array);
                    }).catch(function (error) {
                        reject(error);
                    });
                }
                resolve(new Set(array));
            });
        };
        return KML;
    }(NonFirstNormalFormDataSource_1.NonFirstNormalFormDataSource));
    exports.KML = KML;
});
//# sourceMappingURL=KML.js.map
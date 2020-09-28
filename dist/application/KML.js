"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KML = void 0;
const NonFirstNormalFormDataSource_1 = require("../core/NonFirstNormalFormDataSource");
const FetchResultSet_1 = require("../core/FetchResultSet");
const axios_1 = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
class KML extends NonFirstNormalFormDataSource_1.NonFirstNormalFormDataSource {
    constructor(options) {
        super(options);
        let capabilitiesOptions = {
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
        this._capabilities = capabilitiesOptions;
        this.proxyPrefix = options.proxyPrefix;
    }
    getMetaData() {
        throw new Error("Method not implemented.");
    }
    aggregateByIds(ids, aggregateOperator, attributeName) {
        throw new Error("Method not implemented.");
    }
    fetchAttributeNamesFromId(id) {
        throw new Error("Method not implemented.");
    }
    fetchAttributeValuesFromId(id) {
        let scope = this;
        return new Promise(function (resolve, reject) {
            axios_1.default.get(((scope.proxyPrefix == null || scope._uri.indexOf(scope.proxyPrefix) >= 0) ? "" : scope.proxyPrefix) + scope._uri).then(function (result) {
                let xmlDoc = new JSDOM(result.data);
                let placemark = xmlDoc.window.document.getElementById(id);
                if (placemark == null) {
                    reject("KML Placemark with ID = " + id + " does not exist!");
                    return;
                }
                let extendedData = placemark.getElementsByTagName('ExtendedData')[0];
                let schemaData = extendedData.getElementsByTagName('SchemaData')[0];
                let simpleDataList = schemaData.getElementsByTagName('SimpleData');
                let array = [];
                let kvp = {};
                kvp["id"] = id;
                for (let i = 0; i < simpleDataList.length; i++) {
                    let key = simpleDataList[i].getAttribute("name");
                    let value = simpleDataList[i].textContent;
                    if (key != null) {
                        kvp[key] = value;
                    }
                }
                array.push(kvp);
                let fetchResultSet = new FetchResultSet_1.FetchResultSet(array);
                resolve(fetchResultSet);
            }).catch(function (error) {
                reject(error);
            });
        });
    }
    fetchAttributeValuesFromName(name) {
        let scope = this;
        return new Promise(function (resolve, reject) {
            axios_1.default.get(((scope.proxyPrefix == null || scope._uri.indexOf(scope.proxyPrefix) >= 0) ? "" : scope.proxyPrefix) + scope._uri).then(function (result) {
                let xmlDoc = new JSDOM(result.data);
                let placemarks = xmlDoc.window.document.getElementsByTagName("Placemark");
                for (let i = 0; i < placemarks.length; i++) {
                    let iPlacemark = placemarks[i];
                    let placemarkName = iPlacemark.getElementsByTagName("name")[0];
                    if (placemarkName.textContent === name) {
                        let extendedData = iPlacemark.getElementsByTagName('ExtendedData')[0];
                        let schemaData = extendedData.getElementsByTagName('SchemaData')[0];
                        let simpleDataList = schemaData.getElementsByTagName('SimpleData');
                        let array = [];
                        let kvp = {};
                        kvp["id"] = name;
                        for (let i = 0; i < simpleDataList.length; i++) {
                            let key = simpleDataList[i].getAttribute("name");
                            let value = simpleDataList[i].textContent;
                            if (key != null) {
                                kvp[key] = value;
                            }
                        }
                        array.push(kvp);
                        let fetchResultSet = new FetchResultSet_1.FetchResultSet(array);
                        resolve(fetchResultSet);
                    }
                }
            }).catch(function (error) {
                reject(error);
            });
        });
    }
    fetchIdsFromQBE(qbe, limit) {
        let scope = this;
        return new Promise(function (resolve, reject) {
            axios_1.default.get(((scope.proxyPrefix == null || scope._uri.indexOf(scope.proxyPrefix) >= 0) ? "" : scope.proxyPrefix) + scope._uri).then(function (result) {
                let xmlDoc = new JSDOM(result.data);
                if (limit == null) {
                    limit = Number.MAX_VALUE;
                }
                let array = new Set();
                let count = 0;
                let placemarks = xmlDoc.window.document.getElementsByTagName("Placemark");
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
                        for (let i = 0; i < placemarks.length; i++) {
                            let iPlacemark = placemarks[i];
                            let placemarkName = iPlacemark.getElementsByTagName("name")[0];
                            if (placemarkName != null && qbe.assert(placemarkName.textContent)) {
                                if (++count <= limit) {
                                    let tmpId = iPlacemark.getAttribute("id");
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
                        for (let i = 0; i < placemarks.length; i++) {
                            let iPlacemark = placemarks[i];
                            let placemarkVisibility = iPlacemark.getElementsByTagName("visibility")[0];
                            if (placemarkVisibility != null && qbe.assert(placemarkVisibility.textContent)) {
                                if (++count <= limit) {
                                    let tmpId = iPlacemark.getAttribute("id");
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
                        for (let i = 0; i < placemarks.length; i++) {
                            let iPlacemark = placemarks[i];
                            let extendedData = iPlacemark.getElementsByTagName('ExtendedData')[0];
                            let schemaData = extendedData.getElementsByTagName('SchemaData')[0];
                            let simpleDataList = schemaData.getElementsByTagName('SimpleData');
                            for (let i = 0; i < simpleDataList.length; i++) {
                                let key = simpleDataList[i].getAttribute("name");
                                if (qbe.assert(key)) {
                                    if (++count <= limit) {
                                        let tmpId = iPlacemark.getAttribute("id");
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
                        for (let i = 0; i < placemarks.length; i++) {
                            let iPlacemark = placemarks[i];
                            let extendedData = iPlacemark.getElementsByTagName('ExtendedData')[0];
                            let schemaData = extendedData.getElementsByTagName('SchemaData')[0];
                            let simpleDataList = schemaData.getElementsByTagName('SimpleData');
                            for (let i = 0; i < simpleDataList.length; i++) {
                                let value = simpleDataList[i].textContent;
                                if (qbe.assert(value)) {
                                    if (++count <= limit) {
                                        let tmpId = iPlacemark.getAttribute("id");
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
    }
    fetchIdsFromQBEs(qbes, limit) {
        let scope = this;
        if (limit == null) {
            limit = Number.MAX_VALUE;
        }
        return new Promise(function (resolve, reject) {
            let array = new Set();
            for (let qbe of qbes) {
                scope.fetchIdsFromQBE(qbe).then(function (result) {
                    result.forEach(array.add, array);
                }).catch(function (error) {
                    reject(error);
                });
            }
            resolve(new Set(array));
        });
    }
}
exports.KML = KML;

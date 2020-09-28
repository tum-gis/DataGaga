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
        define(["require", "exports", "./FetchResultSet", "./DataSource"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MashupDataSource = void 0;
    var FetchResultSet_1 = require("./FetchResultSet");
    var DataSource_1 = require("./DataSource");
    var MashupDataSource = (function (_super) {
        __extends(MashupDataSource, _super);
        function MashupDataSource(options, mashup) {
            var _this = _super.call(this, options) || this;
            if (mashup != null) {
                _this._mashup = mashup;
            }
            else {
                _this._mashup = [];
            }
            return _this;
        }
        MashupDataSource.prototype.addDataSource = function (dataSource) {
            if (dataSource != null) {
                this._mashup.push(dataSource);
            }
        };
        MashupDataSource.prototype.removeDataSource = function (index) {
            if (index != null && index >= 0 && index < this._mashup.length) {
                this._mashup.splice(index, 1);
            }
        };
        MashupDataSource.prototype.size = function () {
            return this._mashup.length;
        };
        MashupDataSource.prototype.get = function (index) {
            return this._mashup[index];
        };
        Object.defineProperty(MashupDataSource.prototype, "mashup", {
            get: function () {
                return this._mashup;
            },
            set: function (value) {
                this._mashup = value;
            },
            enumerable: false,
            configurable: true
        });
        MashupDataSource.prototype.aggregateByIds = function (ids, aggregateOperator, attributeName) {
            throw new Error("Method not implemented.");
        };
        MashupDataSource.prototype.fetchAttributeNamesFromId = function (id) {
            throw new Error("Method not implemented.");
        };
        MashupDataSource.prototype.fetchAttributeValuesFromId = function (id) {
            var scope = this;
            var result = new FetchResultSet_1.FetchResultSet([]);
            var promises = new Array();
            for (var _i = 0, _a = scope._mashup; _i < _a.length; _i++) {
                var datasource = _a[_i];
                if (typeof datasource["fetchAttributeValuesFromId"] === "function") {
                    promises.push(datasource["fetchAttributeValuesFromId"](id));
                }
            }
            return new Promise(function (resolve, reject) {
                Promise.all(promises).then(function (fetchResultSets) {
                    for (var _i = 0, fetchResultSets_1 = fetchResultSets; _i < fetchResultSets_1.length; _i++) {
                        var fetchResultSet = fetchResultSets_1[_i];
                        result.concat(fetchResultSet);
                    }
                    if (result.size() >= 0) {
                        resolve(result);
                    }
                    else {
                        reject("Could not fetch for this mashup.");
                    }
                }).catch(function (error) {
                    reject(error);
                });
            });
        };
        MashupDataSource.prototype.fetchIdsFromQBE = function (qbe, limit) {
            throw new Error("Method not implemented.");
        };
        MashupDataSource.prototype.fetchIdsFromQBEs = function (qbes, limit) {
            throw new Error("Method not implemented.");
        };
        MashupDataSource.prototype.getMetaData = function () {
            throw new Error("Method not implemented.");
        };
        return MashupDataSource;
    }(DataSource_1.DataSource));
    exports.MashupDataSource = MashupDataSource;
});
//# sourceMappingURL=MashupDataSource.js.map
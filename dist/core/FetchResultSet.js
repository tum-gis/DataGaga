(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../util/DataSourceUtil"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FetchResultSet = void 0;
    var DataSourceUtil_1 = require("../util/DataSourceUtil");
    var FetchResultSet = (function () {
        function FetchResultSet(data) {
            var tmpData = data;
            if (DataSourceUtil_1.DataSourceUtil.isString(data)) {
                data = JSON.parse(data);
            }
            if (DataSourceUtil_1.DataSourceUtil.isArrayOfKVPs(data)) {
                this._data = data;
            }
            else {
                this._data = [];
            }
        }
        FetchResultSet.prototype.concat = function (otherFetchResultSet) {
            if (otherFetchResultSet != null && otherFetchResultSet.size()) {
                this._data = this._data.concat(otherFetchResultSet._data);
            }
        };
        FetchResultSet.prototype.push = function (kvp) {
            this._data.push(kvp);
        };
        FetchResultSet.prototype.remove = function (index) {
            this._data.splice(index, 1);
        };
        FetchResultSet.prototype.toKVP = function (dataStructureType) {
            var kvpResult = {};
            if (dataStructureType == "Horizontal" || this._data.length === 1) {
                var row = this._data[0];
                var count = 0;
                for (var k in row) {
                    if (count++ === 0) {
                        continue;
                    }
                    kvpResult[k] = row[k];
                }
            }
            else {
                for (var i = 0; i < this._data.length; i++) {
                    var row = this._data[i];
                    var keys = Object.keys(row);
                    var attributeName = row[keys[1]];
                    var attributeValue = row[keys[2]];
                    kvpResult[attributeName] = attributeValue;
                }
            }
            return kvpResult;
        };
        FetchResultSet.prototype.getNrOfRows = function () {
            return this._data.length;
        };
        FetchResultSet.prototype.size = function () {
            return this.getNrOfRows();
        };
        FetchResultSet.prototype.getNrOfEntries = function () {
            var result = 0;
            for (var row in this._data) {
                result += Object.keys(row).length;
            }
            return result;
        };
        FetchResultSet.prototype.isRectangular = function () {
            if (this.getNrOfRows() === 0) {
                return true;
            }
            var nrOfCols = Object.keys(this._data[0]).length;
            for (var i = 1; i < this.getNrOfRows(); i++) {
                if (Object.keys(this._data[i]).length !== nrOfCols) {
                    return false;
                }
            }
            return true;
        };
        FetchResultSet.prototype.getColumnNames = function () {
            if (!this.isRectangular()) {
                return [];
            }
            if (this.getNrOfRows() === 0) {
                return [];
            }
            return Object.keys(this._data[0]);
        };
        FetchResultSet.prototype.toString = function () {
            var result = "[\n";
            var _loop_1 = function (kvp) {
                result += "\t{\n";
                Object.keys(kvp).forEach(function (key) {
                    result += "\t\t" + key + " : " + kvp[key] + "\n";
                });
                result += "\t}\n";
            };
            for (var _i = 0, _a = this._data; _i < _a.length; _i++) {
                var kvp = _a[_i];
                _loop_1(kvp);
            }
            result += "]\n";
            return result;
        };
        Object.defineProperty(FetchResultSet.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
            },
            enumerable: false,
            configurable: true
        });
        return FetchResultSet;
    }());
    exports.FetchResultSet = FetchResultSet;
});
//# sourceMappingURL=FetchResultSet.js.map
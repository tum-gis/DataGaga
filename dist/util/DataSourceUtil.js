(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DataSourceUtil = void 0;
    var DataSourceUtil = (function () {
        function DataSourceUtil() {
        }
        DataSourceUtil.isArrayOfKVPs = function (object) {
            if (this.isArray(object)) {
                for (var i in object) {
                    if (!this.isKVP(i)) {
                        return false;
                    }
                }
                return true;
            }
            else {
                return false;
            }
        };
        DataSourceUtil.isKVP = function (object) {
            return Object.keys(object).length > 0;
        };
        DataSourceUtil.isArray = function (object) {
            return Array.isArray(object);
        };
        DataSourceUtil.isString = function (object) {
            return typeof object === "string";
        };
        DataSourceUtil.isNumber = function (object) {
            return typeof object === "number";
        };
        DataSourceUtil.isBoolean = function (object) {
            return typeof object === "boolean";
        };
        return DataSourceUtil;
    }());
    exports.DataSourceUtil = DataSourceUtil;
});
//# sourceMappingURL=DataSourceUtil.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSourceUtil = void 0;
class DataSourceUtil {
    static isArrayOfKVPs(object) {
        if (this.isArray(object)) {
            for (let i in object) {
                if (!this.isKVP(i)) {
                    return false;
                }
            }
            return true;
        }
        else {
            return false;
        }
    }
    static isKVP(object) {
        return Object.keys(object).length > 0;
    }
    static isArray(object) {
        return Array.isArray(object);
    }
    static isString(object) {
        return typeof object === "string";
    }
    static isNumber(object) {
        return typeof object === "number";
    }
    static isBoolean(object) {
        return typeof object === "boolean";
    }
}
exports.DataSourceUtil = DataSourceUtil;

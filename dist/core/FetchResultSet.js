"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchResultSet = void 0;
const DataSourceUtil_1 = require("../util/DataSourceUtil");
class FetchResultSet {
    constructor(data) {
        let tmpData = data;
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
    concat(otherFetchResultSet) {
        if (otherFetchResultSet != null && otherFetchResultSet.size()) {
            this._data = this._data.concat(otherFetchResultSet._data);
        }
    }
    push(kvp) {
        this._data.push(kvp);
    }
    remove(index) {
        this._data.splice(index, 1);
    }
    toKVP(dataStructureType) {
        let kvpResult = {};
        if (dataStructureType == "Horizontal" || this._data.length === 1) {
            let row = this._data[0];
            let count = 0;
            for (let k in row) {
                if (count++ === 0) {
                    continue;
                }
                kvpResult[k] = row[k];
            }
        }
        else {
            for (var i = 0; i < this._data.length; i++) {
                let row = this._data[i];
                let keys = Object.keys(row);
                let attributeName = row[keys[1]];
                let attributeValue = row[keys[2]];
                kvpResult[attributeName] = attributeValue;
            }
        }
        return kvpResult;
    }
    getNrOfRows() {
        return this._data.length;
    }
    size() {
        return this.getNrOfRows();
    }
    getNrOfEntries() {
        let result = 0;
        for (let row in this._data) {
            result += Object.keys(row).length;
        }
        return result;
    }
    isRectangular() {
        if (this.getNrOfRows() === 0) {
            return true;
        }
        let nrOfCols = Object.keys(this._data[0]).length;
        for (var i = 1; i < this.getNrOfRows(); i++) {
            if (Object.keys(this._data[i]).length !== nrOfCols) {
                return false;
            }
        }
        return true;
    }
    getColumnNames() {
        if (!this.isRectangular()) {
            return [];
        }
        if (this.getNrOfRows() === 0) {
            return [];
        }
        return Object.keys(this._data[0]);
    }
    toString() {
        let result = "[\n";
        for (let kvp of this._data) {
            result += "\t{\n";
            Object.keys(kvp).forEach(function (key) {
                result += "\t\t" + key + " : " + kvp[key] + "\n";
            });
            result += "\t}\n";
        }
        result += "]\n";
        return result;
    }
    get data() {
        return this._data;
    }
    set data(value) {
        this._data = value;
    }
}
exports.FetchResultSet = FetchResultSet;

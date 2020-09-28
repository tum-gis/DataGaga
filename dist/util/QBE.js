"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QBE = void 0;
class QBE {
    constructor(attributeName, comparisonOperator, value) {
        this._attributeName = attributeName;
        this._comparisonOperator = comparisonOperator;
        this._value = value;
    }
    assert(value, caseSensitive) {
        if (value == null) {
            return false;
        }
        let otherNumValue = Number(value);
        let thisNumValue = Number(this._value);
        if (!isNaN(thisNumValue) && !isNaN(otherNumValue)) {
            switch (this._comparisonOperator) {
                case "==":
                    return otherNumValue == thisNumValue;
                case ">":
                    return otherNumValue > thisNumValue;
                case ">=":
                    return otherNumValue >= thisNumValue;
                case "<":
                    return otherNumValue < thisNumValue;
                case "<=":
                    return otherNumValue <= thisNumValue;
                default:
                    return false;
            }
        }
        else {
            let otherTextValue = value;
            let thisTextValue = this._value;
            if (caseSensitive != null && caseSensitive) {
                otherTextValue = value.toLowerCase();
                thisTextValue = this._value.toLowerCase();
            }
            switch (this._comparisonOperator) {
                case "==":
                    return otherTextValue.localeCompare(thisTextValue) === 0;
                case ">":
                    return otherTextValue.localeCompare(thisTextValue) > 0;
                case ">=":
                    return otherTextValue.localeCompare(thisTextValue) >= 0;
                case "<":
                    return otherTextValue.localeCompare(thisTextValue) < 0;
                case "<=":
                    return otherTextValue.localeCompare(thisTextValue) <= 0;
                default:
                    return false;
            }
        }
    }
    toKVP() {
        let result = {};
        result["attributeName"] = this._attributeName;
        result["comparisonOperator"] = this._comparisonOperator;
        result["value"] = this._value;
        return result;
    }
    toString() {
        return this.toKVP().toString();
    }
    get attributeName() {
        return this._attributeName;
    }
    set attributeName(value) {
        this._attributeName = value;
    }
    get comparisonOperator() {
        return this._comparisonOperator;
    }
    set comparisonOperator(value) {
        this._comparisonOperator = value;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
}
exports.QBE = QBE;

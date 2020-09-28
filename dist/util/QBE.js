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
    exports.QBE = void 0;
    var QBE = (function () {
        function QBE(attributeName, comparisonOperator, value) {
            this._attributeName = attributeName;
            this._comparisonOperator = comparisonOperator;
            this._value = value;
        }
        QBE.prototype.assert = function (value, caseSensitive) {
            if (value == null) {
                return false;
            }
            var otherNumValue = Number(value);
            var thisNumValue = Number(this._value);
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
                var otherTextValue = value;
                var thisTextValue = this._value;
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
        };
        QBE.prototype.toKVP = function () {
            var result = {};
            result["attributeName"] = this._attributeName;
            result["comparisonOperator"] = this._comparisonOperator;
            result["value"] = this._value;
            return result;
        };
        QBE.prototype.toString = function () {
            return this.toKVP().toString();
        };
        Object.defineProperty(QBE.prototype, "attributeName", {
            get: function () {
                return this._attributeName;
            },
            set: function (value) {
                this._attributeName = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(QBE.prototype, "comparisonOperator", {
            get: function () {
                return this._comparisonOperator;
            },
            set: function (value) {
                this._comparisonOperator = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(QBE.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                this._value = value;
            },
            enumerable: false,
            configurable: true
        });
        return QBE;
    }());
    exports.QBE = QBE;
});
//# sourceMappingURL=QBE.js.map
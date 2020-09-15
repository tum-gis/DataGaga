var Util = (function () {
    function Util() {
    }
    Util.initAttribute = function (object, attributeName, attributeValue, defaultValue) {
        if (object[attributeName] == null) {
            object[attributeName] = defaultValue;
        }
        else {
            object[attributeName] = attributeValue;
        }
    };
    Util.isArrayOfKVPs = function (object) {
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
    Util.isKVP = function (object) {
        return Object.keys(object).length > 0;
    };
    Util.isArray = function (object) {
        return Array.isArray(object);
    };
    Util.isString = function (object) {
        return typeof object === "string";
    };
    Util.isNumber = function (object) {
        return typeof object === "number";
    };
    Util.isBoolean = function (object) {
        return typeof object === "boolean";
    };
    return Util;
}());

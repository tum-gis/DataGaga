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
    exports.WebUtil = void 0;
    var WebUtil = (function () {
        function WebUtil() {
        }
        WebUtil.httpGet = function (url) {
            return new Promise(function (resolve, reject) {
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open("GET", url, true);
                xmlHttp.onreadystatechange = function () {
                    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                        resolve(xmlHttp.responseText);
                    }
                };
                xmlHttp.onerror = function () {
                    reject({
                        status: xmlHttp.status,
                        statusText: xmlHttp.statusText
                    });
                };
                xmlHttp.send(null);
            });
        };
        return WebUtil;
    }());
    exports.WebUtil = WebUtil;
});
//# sourceMappingURL=WebUtil.js.map
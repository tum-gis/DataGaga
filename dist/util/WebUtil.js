"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebUtil = void 0;
class WebUtil {
    static httpGet(url) {
        return new Promise(function (resolve, reject) {
            let xmlHttp = new XMLHttpRequest();
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
    }
}
exports.WebUtil = WebUtil;

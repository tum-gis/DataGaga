/**
 * An auxiliary class storing web utility functions.
 */
export class WebUtil {
    /**
     * Retrieves information from the web using HTTP GET.
     *
     * @param url
     * @return a promise result of the response from the web service
     */
    public static httpGet(url: string): Promise<any> {
        return new Promise(function (resolve, reject) {
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", url, true);
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                    resolve(xmlHttp.responseText);
                }
            }
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
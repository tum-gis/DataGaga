(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../core/MashupDataSource", "../application/GoogleSheets", "../application/PostgreSQL", "../application/KML"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DataGaga = void 0;
    var MashupDataSource_1 = require("../core/MashupDataSource");
    var GoogleSheets_1 = require("../application/GoogleSheets");
    var PostgreSQL_1 = require("../application/PostgreSQL");
    var KML_1 = require("../application/KML");
    var DataGaga = (function () {
        function DataGaga() {
        }
        DataGaga.createDataSource = function (dataSourceType, options) {
            if (dataSourceType != null) {
                switch (dataSourceType) {
                    case "Mashup":
                        return new MashupDataSource_1.MashupDataSource(options);
                    case "GoogleSheets":
                        return new GoogleSheets_1.GoogleSheets(options);
                    case "PostgreSQL":
                        return new PostgreSQL_1.PostgreSQL(options);
                    case "KML":
                        return new KML_1.KML(options);
                    default:
                        throw new Error("Invalid data source type. Entered value: " + dataSourceType + ".");
                }
            }
            else {
                throw new Error("Empty data source type entered.");
            }
        };
        return DataGaga;
    }());
    exports.DataGaga = DataGaga;
});
//# sourceMappingURL=DataGaga.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataGaga = void 0;
const MashupDataSource_1 = require("../core/MashupDataSource");
const GoogleSheets_1 = require("../application/GoogleSheets");
const PostgreSQL_1 = require("../application/PostgreSQL");
const KML_1 = require("../application/KML");
class DataGaga {
    static createDataSource(dataSourceType, options) {
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
    }
}
exports.DataGaga = DataGaga;

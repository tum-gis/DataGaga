(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./application/GoogleSheets", "./application/KML", "./application/PostgreSQL", "./controller/DataGaga", "./core/DataSource", "./core/FetchResultSet", "./core/FirstNormalFormDataSource", "./core/MashupDataSource", "./core/NonFirstNormalFormDataSource", "./core/UnitDataSource", "./util/DataSourceUtil", "./util/QBE", "./util/WebUtil"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WebUtil = exports.QBE = exports.DataSourceUtil = exports.UnitDataSource = exports.NonFirstNormalFormDataSource = exports.MashupDataSource = exports.FirstNormalFormDataSource = exports.FetchResultSet = exports.DataSource = exports.DataGaga = exports.PostgreSQL = exports.KML = exports.GoogleSheets = void 0;
    var GoogleSheets_1 = require("./application/GoogleSheets");
    Object.defineProperty(exports, "GoogleSheets", { enumerable: true, get: function () { return GoogleSheets_1.GoogleSheets; } });
    var KML_1 = require("./application/KML");
    Object.defineProperty(exports, "KML", { enumerable: true, get: function () { return KML_1.KML; } });
    var PostgreSQL_1 = require("./application/PostgreSQL");
    Object.defineProperty(exports, "PostgreSQL", { enumerable: true, get: function () { return PostgreSQL_1.PostgreSQL; } });
    var DataGaga_1 = require("./controller/DataGaga");
    Object.defineProperty(exports, "DataGaga", { enumerable: true, get: function () { return DataGaga_1.DataGaga; } });
    var DataSource_1 = require("./core/DataSource");
    Object.defineProperty(exports, "DataSource", { enumerable: true, get: function () { return DataSource_1.DataSource; } });
    var FetchResultSet_1 = require("./core/FetchResultSet");
    Object.defineProperty(exports, "FetchResultSet", { enumerable: true, get: function () { return FetchResultSet_1.FetchResultSet; } });
    var FirstNormalFormDataSource_1 = require("./core/FirstNormalFormDataSource");
    Object.defineProperty(exports, "FirstNormalFormDataSource", { enumerable: true, get: function () { return FirstNormalFormDataSource_1.FirstNormalFormDataSource; } });
    var MashupDataSource_1 = require("./core/MashupDataSource");
    Object.defineProperty(exports, "MashupDataSource", { enumerable: true, get: function () { return MashupDataSource_1.MashupDataSource; } });
    var NonFirstNormalFormDataSource_1 = require("./core/NonFirstNormalFormDataSource");
    Object.defineProperty(exports, "NonFirstNormalFormDataSource", { enumerable: true, get: function () { return NonFirstNormalFormDataSource_1.NonFirstNormalFormDataSource; } });
    var UnitDataSource_1 = require("./core/UnitDataSource");
    Object.defineProperty(exports, "UnitDataSource", { enumerable: true, get: function () { return UnitDataSource_1.UnitDataSource; } });
    var DataSourceUtil_1 = require("./util/DataSourceUtil");
    Object.defineProperty(exports, "DataSourceUtil", { enumerable: true, get: function () { return DataSourceUtil_1.DataSourceUtil; } });
    var QBE_1 = require("./util/QBE");
    Object.defineProperty(exports, "QBE", { enumerable: true, get: function () { return QBE_1.QBE; } });
    var WebUtil_1 = require("./util/WebUtil");
    Object.defineProperty(exports, "WebUtil", { enumerable: true, get: function () { return WebUtil_1.WebUtil; } });
});
//# sourceMappingURL=index.js.map
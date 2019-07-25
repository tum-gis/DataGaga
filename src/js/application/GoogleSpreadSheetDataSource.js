var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GoogleSpreadSheetDataSource = /** @class */ (function (_super) {
    __extends(GoogleSpreadSheetDataSource, _super);
    function GoogleSpreadSheetDataSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GoogleSpreadSheetDataSource.prototype.countFromResult = function (res) {
        // TODO
        return null;
    };
    GoogleSpreadSheetDataSource.prototype.deleteDataRecordUsingId = function (id) {
        // TODO
        return null;
    };
    GoogleSpreadSheetDataSource.prototype.fetchIdsFromResult = function (res) {
        // TODO
        return null;
    };
    GoogleSpreadSheetDataSource.prototype.insertDataRecord = function (record) {
        // TODO
        return null;
    };
    GoogleSpreadSheetDataSource.prototype.queryUsingIds = function (ids) {
        // TODO
        return null;
    };
    GoogleSpreadSheetDataSource.prototype.queryUsingNames = function (names, limit) {
        // TODO
        return null;
    };
    GoogleSpreadSheetDataSource.prototype.queryUsingSql = function (sql, limit) {
        // TODO
        return null;
    };
    GoogleSpreadSheetDataSource.prototype.queryUsingTypes = function (types, limit) {
        // TODO
        return null;
    };
    GoogleSpreadSheetDataSource.prototype.sumFromResultByColIndex = function (res, colIndex) {
        // TODO
        return null;
    };
    GoogleSpreadSheetDataSource.prototype.sumFromResultByName = function (res, name) {
        // TODO
        return null;
    };
    GoogleSpreadSheetDataSource.prototype.updateDataRecordUsingId = function (id, newRecord) {
        // TODO
        return null;
    };
    return GoogleSpreadSheetDataSource;
}(SQLDataSource));
//# sourceMappingURL=GoogleSpreadSheetDataSource.js.map
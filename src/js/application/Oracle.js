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
var Oracle = /** @class */ (function (_super) {
    __extends(Oracle, _super);
    function Oracle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Oracle.prototype.countFromResult = function (res) {
        // TODO
        return null;
    };
    Oracle.prototype.deleteDataRecordUsingId = function (id) {
        // TODO
        return null;
    };
    Oracle.prototype.fetchIdsFromResult = function (res) {
        // TODO
        return null;
    };
    Oracle.prototype.insertDataRecord = function (record) {
        // TODO
        return null;
    };
    Oracle.prototype.queryUsingIds = function (ids) {
        // TODO
        return null;
    };
    Oracle.prototype.queryUsingNames = function (names, limit) {
        // TODO
        return null;
    };
    Oracle.prototype.queryUsingSql = function (sql, limit) {
        // TODO
        return null;
    };
    Oracle.prototype.queryUsingTypes = function (types, limit) {
        // TODO
        return null;
    };
    Oracle.prototype.sumFromResultByColIndex = function (res, colIndex) {
        // TODO
        return null;
    };
    Oracle.prototype.sumFromResultByName = function (res, name) {
        // TODO
        return null;
    };
    Oracle.prototype.updateDataRecordUsingId = function (id, newRecord) {
        // TODO
        return null;
    };
    return Oracle;
}(SQLDataSource));
//# sourceMappingURL=Oracle.js.map
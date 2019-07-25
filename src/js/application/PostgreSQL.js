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
var PostgreSQL = /** @class */ (function (_super) {
    __extends(PostgreSQL, _super);
    function PostgreSQL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PostgreSQL.prototype.countFromResult = function (res) {
        // TODO
        return null;
    };
    PostgreSQL.prototype.deleteDataRecordUsingId = function (id) {
        // TODO
        return null;
    };
    PostgreSQL.prototype.fetchIdsFromResult = function (res) {
        // TODO
        return null;
    };
    PostgreSQL.prototype.insertDataRecord = function (record) {
        // TODO
        return null;
    };
    PostgreSQL.prototype.queryUsingIds = function (ids) {
        // TODO
        return null;
    };
    PostgreSQL.prototype.queryUsingNames = function (names, limit) {
        // TODO
        return null;
    };
    PostgreSQL.prototype.queryUsingSql = function (sql, limit) {
        // TODO
        return null;
    };
    PostgreSQL.prototype.queryUsingTypes = function (types, limit) {
        // TODO
        return null;
    };
    PostgreSQL.prototype.sumFromResultByColIndex = function (res, colIndex) {
        // TODO
        return null;
    };
    PostgreSQL.prototype.sumFromResultByName = function (res, name) {
        // TODO
        return null;
    };
    PostgreSQL.prototype.updateDataRecordUsingId = function (id, newRecord) {
        // TODO
        return null;
    };
    return PostgreSQL;
}(SQLDataSource));
//# sourceMappingURL=PostgreSQL.js.map
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
var Neo4j = /** @class */ (function (_super) {
    __extends(Neo4j, _super);
    function Neo4j() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Neo4j.prototype.countFromResult = function (res) {
        // TODO
        return null;
    };
    Neo4j.prototype.deleteDataRecordUsingId = function (id) {
        // TODO
        return null;
    };
    Neo4j.prototype.fetchIdsFromResult = function (res) {
        // TODO
        return null;
    };
    Neo4j.prototype.insertDataRecord = function (record) {
        // TODO
        return null;
    };
    Neo4j.prototype.queryUsingIds = function (ids) {
        // TODO
        return null;
    };
    Neo4j.prototype.queryUsingNames = function (names, limit) {
        // TODO
        return null;
    };
    Neo4j.prototype.queryUsingSql = function (sql, limit) {
        // TODO
        return null;
    };
    Neo4j.prototype.queryUsingTypes = function (types, limit) {
        // TODO
        return null;
    };
    Neo4j.prototype.sumFromResultByColIndex = function (res, colIndex) {
        // TODO
        return null;
    };
    Neo4j.prototype.sumFromResultByName = function (res, name) {
        // TODO
        return null;
    };
    Neo4j.prototype.updateDataRecordUsingId = function (id, newRecord) {
        // TODO
        return null;
    };
    return Neo4j;
}(GraphType));
//# sourceMappingURL=Neo4j.js.map
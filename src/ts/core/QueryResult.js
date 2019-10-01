var QueryResult = /** @class */ (function () {
    function QueryResult(data) {
        this._data = data;
    }
    QueryResult.prototype.getSize = function () {
        var size = 0;
        var key;
        for (var key_1 in this._data) {
            if (this._data.hasOwnProperty(key_1)) {
                size++;
            }
        }
        return size;
    };
    return QueryResult;
}());
//# sourceMappingURL=QueryResult.js.map
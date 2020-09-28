"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitDataSource = void 0;
const DataSource_1 = require("./DataSource");
class UnitDataSource extends DataSource_1.DataSource {
    constructor(options) {
        super(options);
        this._provider = (options.provider == null) ? "My data source provider" : options.provider;
        this._uri = (options.uri == null) ? "" : options.uri;
    }
    get provider() {
        return this._provider;
    }
    set provider(value) {
        this._provider = value;
    }
    get uri() {
        return this._uri;
    }
    set uri(value) {
        this._uri = value;
    }
}
exports.UnitDataSource = UnitDataSource;

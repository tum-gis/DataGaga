"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSource = void 0;
class DataSource {
    constructor(options) {
        this._name = (options.name == null) ? "My data source name" : options.name;
        this._dataSourceType = (options.dataSourceType == null) ? "PostgreSQL" : options.dataSourceType;
        this._capabilities = (options.capabilities == null) ? {
            webCapabilities: {
                restAPI: false
            },
            dbTransactionCapabilities: {
                read: true,
                insert: false,
                delete: false,
                update: false
            },
            securityCapabilities: {
                oauth: false
            }
        } : options.capabilities;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get dataSourceType() {
        return this._dataSourceType;
    }
    set dataSourceType(value) {
        this._dataSourceType = value;
    }
    get capabilities() {
        return this._capabilities;
    }
    set capabilities(value) {
        this._capabilities = value;
    }
}
exports.DataSource = DataSource;

(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DataSource = void 0;
    var DataSource = (function () {
        function DataSource(options) {
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
        Object.defineProperty(DataSource.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (value) {
                this._name = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DataSource.prototype, "dataSourceType", {
            get: function () {
                return this._dataSourceType;
            },
            set: function (value) {
                this._dataSourceType = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DataSource.prototype, "capabilities", {
            get: function () {
                return this._capabilities;
            },
            set: function (value) {
                this._capabilities = value;
            },
            enumerable: false,
            configurable: true
        });
        return DataSource;
    }());
    exports.DataSource = DataSource;
});
//# sourceMappingURL=DataSource.js.map
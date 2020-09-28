var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./DataSource"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UnitDataSource = void 0;
    var DataSource_1 = require("./DataSource");
    var UnitDataSource = (function (_super) {
        __extends(UnitDataSource, _super);
        function UnitDataSource(options) {
            var _this = _super.call(this, options) || this;
            _this._provider = (options.provider == null) ? "My data source provider" : options.provider;
            _this._uri = (options.uri == null) ? "" : options.uri;
            return _this;
        }
        Object.defineProperty(UnitDataSource.prototype, "provider", {
            get: function () {
                return this._provider;
            },
            set: function (value) {
                this._provider = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UnitDataSource.prototype, "uri", {
            get: function () {
                return this._uri;
            },
            set: function (value) {
                this._uri = value;
            },
            enumerable: false,
            configurable: true
        });
        return UnitDataSource;
    }(DataSource_1.DataSource));
    exports.UnitDataSource = UnitDataSource;
});
//# sourceMappingURL=UnitDataSource.js.map
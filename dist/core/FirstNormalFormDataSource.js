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
        define(["require", "exports", "./UnitDataSource"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FirstNormalFormDataSource = void 0;
    var UnitDataSource_1 = require("./UnitDataSource");
    var FirstNormalFormDataSource = (function (_super) {
        __extends(FirstNormalFormDataSource, _super);
        function FirstNormalFormDataSource(options) {
            var _this = _super.call(this, options) || this;
            _this._dataStructureType = (options.dataStructureType == null) ? "Horizontal" : options.dataStructureType;
            return _this;
        }
        Object.defineProperty(FirstNormalFormDataSource.prototype, "dataStructureType", {
            get: function () {
                return this._dataStructureType;
            },
            set: function (value) {
                this._dataStructureType = value;
            },
            enumerable: false,
            configurable: true
        });
        return FirstNormalFormDataSource;
    }(UnitDataSource_1.UnitDataSource));
    exports.FirstNormalFormDataSource = FirstNormalFormDataSource;
});
//# sourceMappingURL=FirstNormalFormDataSource.js.map
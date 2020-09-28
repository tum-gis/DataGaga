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
    exports.NonFirstNormalFormDataSource = void 0;
    var UnitDataSource_1 = require("./UnitDataSource");
    var NonFirstNormalFormDataSource = (function (_super) {
        __extends(NonFirstNormalFormDataSource, _super);
        function NonFirstNormalFormDataSource(options) {
            return _super.call(this, options) || this;
        }
        return NonFirstNormalFormDataSource;
    }(UnitDataSource_1.UnitDataSource));
    exports.NonFirstNormalFormDataSource = NonFirstNormalFormDataSource;
});
//# sourceMappingURL=NonFirstNormalFormDataSource.js.map
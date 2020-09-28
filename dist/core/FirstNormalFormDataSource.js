"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirstNormalFormDataSource = void 0;
const UnitDataSource_1 = require("./UnitDataSource");
class FirstNormalFormDataSource extends UnitDataSource_1.UnitDataSource {
    constructor(options) {
        super(options);
        this._dataStructureType = (options.dataStructureType == null) ? "Horizontal" : options.dataStructureType;
    }
    get dataStructureType() {
        return this._dataStructureType;
    }
    set dataStructureType(value) {
        this._dataStructureType = value;
    }
}
exports.FirstNormalFormDataSource = FirstNormalFormDataSource;

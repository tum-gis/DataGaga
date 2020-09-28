import { UnitDataSource, UnitDataSourceOptions } from "./UnitDataSource";
import { DataStructureType } from "../util/DataStructureType";
export declare abstract class FirstNormalFormDataSource extends UnitDataSource {
    protected _dataStructureType: DataStructureType;
    protected constructor(options: FirstNormalFormDataSourceOptions);
    get dataStructureType(): DataStructureType;
    set dataStructureType(value: DataStructureType);
}
export interface FirstNormalFormDataSourceOptions extends UnitDataSourceOptions {
    dataStructureType: DataStructureType;
}

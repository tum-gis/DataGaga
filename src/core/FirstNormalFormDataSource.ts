import {UnitDataSource, UnitDataSourceOptions} from "./UnitDataSource";
import {DataStructureType} from "../util/DataStructureType";

export abstract class FirstNormalFormDataSource extends UnitDataSource {
    /**
     * The structural type of the data source.
     * @protected
     */
    protected _dataStructureType: DataStructureType;

    protected constructor(options: FirstNormalFormDataSourceOptions) {
        super(options);
        this._dataStructureType = (options.dataStructureType == null) ? DataStructureType.HORIZONTAL : options.dataStructureType;
    }

    public get dataStructureType(): DataStructureType {
        return this._dataStructureType;
    }

    public set dataStructureType(value: DataStructureType) {
        this._dataStructureType = value;
    }
}

export interface FirstNormalFormDataSourceOptions extends UnitDataSourceOptions {
    dataStructureType: DataStructureType;
}
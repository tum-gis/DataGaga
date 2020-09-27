///<reference path="UnitDataSource.ts"/>

abstract class FirstNormalFormDataSource extends UnitDataSource {
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

interface FirstNormalFormDataSourceOptions extends UnitDataSourceOptions {
    dataStructureType: DataStructureType;
}
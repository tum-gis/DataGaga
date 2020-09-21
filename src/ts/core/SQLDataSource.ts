///<reference path="UnitDataSource.ts"/>

abstract class SQLDataSource extends UnitDataSource {
    /**
     * The structural type of the data source.
     * @protected
     */
    protected _dataStructureType: DataStructureType;

    protected constructor(options) {
        super(options);
        DataSourceUtil.initAttribute(this, "_dataStructureType", options.dataStructureType, DataStructureType.HORIZONTAL);
    }

    public get dataStructureType(): DataStructureType {
        return this._dataStructureType;
    }

    public set dataStructureType(value: DataStructureType) {
        this._dataStructureType = value;
    }
}
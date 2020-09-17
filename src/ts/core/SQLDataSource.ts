///<reference path="DataSource.ts"/>

abstract class SQLDataSource extends DataSource {
    /**
     * The structural type of the data source.
     * @protected
     */
    protected _dataStructureType: DataStructureType;

    protected constructor(options) {
        super(options);
        DataSourceUtil.initAttribute(this, "_dataStructureType", options.dataStructureType, DataStructureType.HORIZONTAL);
    }

    get dataStructureType(): DataStructureType {
        return this._dataStructureType;
    }

    set dataStructureType(value: DataStructureType) {
        this._dataStructureType = value;
    }
}
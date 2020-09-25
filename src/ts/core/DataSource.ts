/**
 * A base class for all data sources.
 */
abstract class DataSource {
    /**
     * An easy-to-rember name of the data source.
     *
     * @protected
     */
    protected _name: string;

    /**
     * The type of this data source.
     *
     * @protected
     */
    protected _dataSourceType: DataSourceType;

    /**
     * Capabilities of the service hosting this data source.
     *
     * @protected
     */
    protected _capabilities: DataSourceCapabilities;

    /**
     * Constructor.
     *
     * @param options an object containing attributes defined in this class
     * @protected
     */
    constructor(options: DataSourceOptions) {
        DataSourceUtil.initAttribute(this, "_name", options.name, "My data source name");
        DataSourceUtil.initAttribute(this, "_dataSourceType", options.dataSourceType, DataSourceType.PostgreSQL);
        DataSourceUtil.initAttribute(this, "_capabilities", options.capabilities, undefined);
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get dataSourceType(): DataSourceType {
        return this._dataSourceType;
    }

    public set dataSourceType(value: DataSourceType) {
        this._dataSourceType = value;
    }

    public get capabilities(): DataSourceCapabilities {
        return this._capabilities;
    }

    public set capabilities(value: DataSourceCapabilities) {
        this._capabilities = value;
    }
}

interface DataSourceOptions {
    name: string;
    dataSourceType: string;
    capabilities: DataSourceCapabilities;
}
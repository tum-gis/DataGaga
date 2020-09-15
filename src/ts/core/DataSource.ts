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
     * The provider of this data source.
     *
     * @protected
     */
    protected _provider: string;

    /**
     * The type of this data source.
     *
     * @protected
     */
    protected _dataSourceType: DataSourceType;

    /**
     * The URI to the resource hosted on the web.
     *
     * @protected
     */
    protected _uri: string;

    /**
     * Capabilities of the service hosting this data source.
     *
     * @protected
     */
    protected _capabilities: DataSourceCapabilities;

    /**
     * The structural type of the data source.
     * @protected
     */
    protected _dataStructureType: DataStructureType;

    /**
     * Constructor.
     *
     * @param options an object containing attributes defined in this class
     * @protected
     */
    protected constructor(options) {
        DataSourceUtil.initAttribute(this, "_name", options.name, "My data source name");
        DataSourceUtil.initAttribute(this, "_provider", options.provider, "My data source provider");
        DataSourceUtil.initAttribute(this, "_dataSourceType", options.provider, DataSourceType.PostgreSQL);
        DataSourceUtil.initAttribute(this, "_uri", options.uri, "");
        DataSourceUtil.initAttribute(this, "_capabilities", options.capabilities, undefined);
        DataSourceUtil.initAttribute(this, "_dataStructureType", options.dataStructureType, DataStructureType.HORIZONTAL);
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get provider(): string {
        return this._provider;
    }

    set provider(value: string) {
        this._provider = value;
    }

    get dataSourceType(): DataSourceType {
        return this._dataSourceType;
    }

    set dataSourceType(value: DataSourceType) {
        this._dataSourceType = value;
    }

    get uri(): string {
        return this._uri;
    }

    set uri(value: string) {
        this._uri = value;
    }

    get capabilities(): DataSourceCapabilities {
        return this._capabilities;
    }

    set capabilities(value: DataSourceCapabilities) {
        this._capabilities = value;
    }

    get dataStructureType(): DataStructureType {
        return this._dataStructureType;
    }

    set dataStructureType(value: DataStructureType) {
        this._dataStructureType = value;
    }
}

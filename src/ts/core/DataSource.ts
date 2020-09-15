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
     * A prefix for loading via proxy.
     *
     * @protected
     */
    protected _proxyPrefix: string;

    /**
     * Constructor.
     *
     * @param options an object containing attributes defined in this class
     * @protected
     */
    protected constructor(options) {
        Util.initAttribute(this, "_name", options.name, "My data source name");
        Util.initAttribute(this, "_provider", options.provider, "My data source provider");
        Util.initAttribute(this, "_uri", options.uri, "");
        Util.initAttribute(this, "_capabilities", options.capabilities, undefined);
        Util.initAttribute(this, "_dataStructureType", options.dataStructureType, DataStructureType.HORIZONTAL);
        Util.initAttribute(this, "_proxyPrefix", options.proxyPrefix, "");
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

    get proxyPrefix(): string {
        return this._proxyPrefix;
    }

    set proxyPrefix(value: string) {
        this._proxyPrefix = value;
    }

    abstract transformToKVPArray(data: any): Array<KVP>;
}

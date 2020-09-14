// In TypeScript if abstract class B implements definition A,
// it must either implement functions from A or declare them as abstract.
// https://github.com/Microsoft/TypeScript/issues/4670
// Alternatively we can do this:
// interface DataSource extends ReadableDataSource, WritableDataSource {}

abstract class DataSource implements ReadableDataSource, WritableDataSource, SecuredDataSource {
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

    abstract fetchAttributeValuesFromId(id: string): Promise<FetchResultSet>;

    abstract fetchAttributeNamesFromId(id: string): Promise<string[]>;

    abstract fetchIdsFromQBE(qbe: QBE, limit?: number): Promise<string[]>;

    abstract aggregateByIds(ids: string[], aggregateOperator: AggregateOperator, attributeName?: string): Promise<number> | Promise<{ kvp: KVP }>;

    abstract aggregateByIds(ids: string[], aggregateOperator: AggregateOperator): Promise<{ kvp: KVP }>;

    abstract aggregateByIds(ids: string[], aggregateOperator: AggregateOperator, attributeName: string): Promise<number>;

    abstract updateAttributeValueOfId(id: string, attributeName: string, newValue: any): Promise<boolean>;

    abstract updateAttributeValuesUsingQBE(qbe: QBE, newAttributeValues: KVP): Promise<boolean>;

    abstract insertAttributeOfId(id: string, attributeName: string, attributeValue: any): Promise<boolean>;

    abstract insertAttributesUsingQBE(qbe: QBE, newAttributes: KVP): Promise<boolean>;

    abstract insertNewObject(kvp: KVP): Promise<boolean>;

    abstract deleteObjectOfId(id: string): Promise<boolean>;

    abstract deleteAttributeOfId(id: string, attributeName: string): Promise<boolean>;

    abstract deleteAttributesUsingQBE(qbe: QBE, attributeNames: string[]): Promise<boolean>;

    abstract deleteObjectsUsingQBE(qbe: QBE): Promise<boolean>;

    abstract login(credentials: any): Promise<boolean>;

    abstract logout(): Promise<boolean>;
}

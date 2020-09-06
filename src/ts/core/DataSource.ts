// In TypeScript if abstract class B implements interface A,
// it must either implement functions from A or declare them as abstract.
// https://github.com/Microsoft/TypeScript/issues/4670
// Alternatively we can do this:
// interface DataSource extends ReadableDataSource, WritableDataSource {}

abstract class DataSource implements ReadableDataSource, WritableDataSource {
    protected _name: string;
    protected _provider: string;
    protected _type: string;
    protected _uri: string;
    protected _capabilities: DataSourceCapabilities;
    protected _tableType: TableTypes;
    protected _idColName: string; // Default: PostgreSQL: gmlid, Spreadsheets: A
    // an available 3rd-party handler, such as Cesium
    // if this is given, the framework will prioritize its implementation
    protected _thirdPartyHandler: any;
    protected _signInController: any;
    protected _proxyPrefix: string;

    protected constructor(signInController, options) {
        this._name = !options.name ? "Data Source" : options.name;
        this._provider = !options.provider ? "Data Provider" : options.provider;
        this._type = !options.type ? "Data Type" : options.type;
        this._uri = !options.uri ? "" : options.uri;
        this._capabilities = !options.capabilities ? undefined : options.capabilities;
        this._tableType = !options.tableType ? TableTypes.Horizontal : options.tableType;
        this._thirdPartyHandler = !options.thirdPartyHandler ? undefined : options.thirdPartyHandler;
        this._signInController = signInController;
        this._proxyPrefix = !options.proxyPrefix ? "" : options.proxyPrefix;
    }

    /**
     * Convert the query response from data source to KVP structure.
     * Note that the response should only have two rows (one for the keys/headers and one for values).
     * Rows starting from 3th should not exist and/or shall be ignored.
     * Also note that the first column must contain the primary keys/IDs.
     *
     * KVP structure:
     * {
     *     key1: value1,
     *     key2: value2
     * }
     *
     * @param response from data source
     * @return object in KVP structure
     */
    abstract responseToKvp(response: any): Map<string, string>;

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

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
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

    get tableType(): TableTypes {
        return this._tableType;
    }

    set tableType(value: TableTypes) {
        this._tableType = value;
    }

    get idColName(): string {
        return this._idColName;
    }

    set idColName(value: string) {
        this._idColName = value;
    }

    get thirdPartyHandler(): any {
        return this._thirdPartyHandler;
    }

    set thirdPartyHandler(value: any) {
        this._thirdPartyHandler = value;
    }

    get signInController(): any {
        return this._signInController;
    }

    set signInController(value: any) {
        this._signInController = value;
    }

    get proxyPrefix(): string {
        return this._proxyPrefix;
    }

    set proxyPrefix(value: string) {
        this._proxyPrefix = value;
    }

    abstract countFromResult(res: QueryResult): number;

    abstract deleteDataRecordUsingId(id: string);

    abstract fetchIdsFromResult(res: QueryResult);

    abstract insertDataRecord(record: DataRecord);

    abstract queryUsingId(id: string, callback: (queryResult: any) => any, limit?: number, clickedObject?: any);

    abstract queryUsingIds(ids: string[]);

    abstract queryUsingNames(names: string[], limit: number);

    abstract queryUsingSql(sql: string, callback: (queryResult: any) => any, limit?: number, clickedObject?: any);

    abstract queryUsingTypes(types: string[], limit: number);

    abstract sumFromResultByColIndex(res: QueryResult, colIndex: number);

    abstract sumFromResultByName(res: QueryResult, name: string);

    abstract updateDataRecordUsingId(id: string, newRecord: DataRecord);

}
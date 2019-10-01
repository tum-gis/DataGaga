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
    protected _capabilities: DataSourceCapabilitiy[];

    constructor(options) {
        this._name = options.name;
        this._provider = options.provider;
        this._type = options.type;
        this._uri = options.uri;
        this._capabilities = options.capabilities;
    }

    /**
     * Convert the query response from data source to KVP structure used in the 3DCityDB-Web-Map-Client.
     * Note that the response should only have two columns (one for the keys and one for values).
     * Columns starting from 3th shall be ignored.
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
    abstract responseToKvp(response: any): any;

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

    get capabilities(): DataSourceCapabilitiy[] {
        return this._capabilities;
    }

    set capabilities(value: DataSourceCapabilitiy[]) {
        this._capabilities = value;
    }

    abstract countFromResult(res: QueryResult): number;

    abstract deleteDataRecordUsingId(id: string);

    abstract fetchIdsFromResult(res: QueryResult);

    abstract insertDataRecord(record: DataRecord);

    abstract queryUsingIds(ids: string[]);

    abstract queryUsingNames(names: string[], limit: number);

    abstract queryUsingSql(sql: string, limit: number, callback: (queryResult: string) => any);

    abstract queryUsingTypes(types: string[], limit: number);

    abstract sumFromResultByColIndex(res: QueryResult, colIndex: number);

    abstract sumFromResultByName(res: QueryResult, name: string);

    abstract updateDataRecordUsingId(id: string, newRecord: DataRecord);

}
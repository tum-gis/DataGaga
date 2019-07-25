abstract class DataSource implements ReadableDataSource, WritableDataSource {
    private _capabilities: DataSourceCapabilitiy[];
    private _name: string;
    private _provider: string;
    private _type: string;
    private _uri: string;

    get capabilities(): DataSourceCapabilitiy[] {
        return this._capabilities;
    }

    set capabilities(value: DataSourceCapabilitiy[]) {
        this._capabilities = value;
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

    abstract countFromResult(res: QueryResult): number;
    abstract deleteDataRecordUsingId(id: string): boolean;
    abstract fetchIdsFromResult(res: QueryResult): string[];
    abstract insertDataRecord(record: DataRecord): boolean;
    abstract queryUsingIds(ids: string[]): QueryResult;
    abstract queryUsingNames(names: string[], limit: number): QueryResult;
    abstract queryUsingSql(sql: string, limit: number): QueryResult;
    abstract queryUsingTypes(types: string[], limit: number): QueryResult;
    abstract sumFromResultByColIndex(res: QueryResult, colIndex: number): number;
    abstract sumFromResultByName(res: QueryResult, name: string): number;
    abstract updateDataRecordUsingId(id: string, newRecord: DataRecord): boolean;
}
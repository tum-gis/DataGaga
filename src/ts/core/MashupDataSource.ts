abstract class MashupDataSource implements ReadableDataSource, WritableDataSource {
    private _mashupDataSources: Array<DataSource>;

    get mashupDataSources(): Array<DataSource> {
        return this._mashupDataSources;
    }

    set mashupDataSources(value: Array<DataSource>) {
        this._mashupDataSources = value;
    }

    public getCapabilities(): DataSourceCapabilities {
        // TODO
        return null;
    }

    public getMostCommonCapabilities(): DataSourceCapabilities {
        // TOTO
        return null;
    }

    public getNames(): Array<string> {
        // TODO
        return null;
    }

    public getProviders(): Array<string> {
        // TODO
        return null;
    }

    public getTypes(): Array<string> {
        // TODO
        return null;
    }

    public getUris(): Array<string> {
        // TODO
        return null;
    }

    countFromResult(res: QueryResult): number {
        // TODO
        return null;
    }

    deleteDataRecordUsingId(id: string): boolean {
        // TODO
        return null;
    }

    fetchIdsFromResult(res: QueryResult): string[] {
        // TODO
        return null;
    }

    insertDataRecord(record: DataRecord): boolean {
        // TODO
        return null;
    }

    queryUsingId(id: string, callback: (queryResult: any) => any, limit?: number, clickedObject?: any): void {
        // TODO
    }

    queryUsingIds(ids: string[]): QueryResult {
        // TODO
        return null;
    }

    queryUsingNames(names: string[], limit: number): QueryResult {
        // TODO
        return null;
    }

    queryUsingSql(sql: string, callback: (queryResult: any) => any, limit?: number, clickedObject?: any): void {
        // TODO
    }

    queryUsingTypes(types: string[], limit: number): QueryResult {
        // TODO
        return null;
    }

    sumFromResultByColIndex(res: QueryResult, colIndex: number): number {
        // TODO
        return null;
    }

    sumFromResultByName(res: QueryResult, name: string): number {
        // TODO
        return null;
    }

    updateDataRecordUsingId(id: string, newRecord: DataRecord): boolean {
        // TODO
        return null;
    }
}
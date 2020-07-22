interface ReadableDataSource {
    fetchIdsFromResult(res: QueryResult): string[];

    queryUsingId(id: string, callback: (queryResult: any) => any, limit?: number, clickedObject?: any): void;

    queryUsingIds(ids: string[]): QueryResult;

    queryUsingNames(names: string[], limit: number): QueryResult;

    queryUsingSql(sql: string, callback: (queryResult: any) => any, limit?: number, clickedObject?: any): void;

    queryUsingTypes(types: string[], limit: number): QueryResult;

    countFromResult(res: QueryResult): number;

    sumFromResultByName(res: QueryResult, name: string): number;

    sumFromResultByColIndex(res: QueryResult, colIndex: number): number;
}
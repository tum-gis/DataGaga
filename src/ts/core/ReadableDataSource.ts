interface ReadableDataSource {
        fetchIdsFromResult(res: QueryResult): string[];

        queryUsingIds(ids: string[]): QueryResult;
        queryUsingNames(names: string[], limit: number): QueryResult;
        queryUsingSql(sql: string, limit: number): QueryResult;
        queryUsingTypes(types: string[], limit: number): QueryResult;

        countFromResult(res: QueryResult): number;
        sumFromResultByName(res: QueryResult, name: string): number;
        sumFromResultByColIndex(res: QueryResult, colIndex: number): number;
    }
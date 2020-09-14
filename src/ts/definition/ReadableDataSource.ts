/**
 * Declares read-only functionalities of a data source.
 */
interface ReadableDataSource {
    /**
     * Fetches attribute values from a given ID.
     *
     * @param id
     * @return a promise result set of type FetchResultSet
     */
    fetchAttributeValuesFromId(id: string): Promise<FetchResultSet>;

    /**
     * Fetches only attribute names from a given ID.
     *
     * @param id
     * @return a promise array of strings containing attribute names
     */
    fetchAttributeNamesFromId(id: string): Promise<string[]>;

    /**
     * Fetches IDs from a given Query-By-Example expression.
     *
     * @param qbe
     * @param limit (optional) the maximum number of records should be fetched
     * @return a promise array of strings containing IDs
     */
    fetchIdsFromQBE(qbe: QBE, limit?: number): Promise<string[]>;

    /**
     * Calculates the aggregated value of a given attribute from given IDs.
     *
     * @param ids
     * @param aggregateOperator
     * @param attributeName
     * @return a promise aggregated value of the given attribute over the given IDs
     */
    aggregateByIds(ids: string[], aggregateOperator: AggregateOperator, attributeName: string): Promise<number>;

    /**
     * Calculates the aggregated value of all attributes from given IDs.
     * The function only aggregate values of common attributes of all records.
     *
     * Example:
     * Aggregating using AVG over the IDs 1 and 2 of
     * { id: 1, height: 10, area: 100}
     * { id: 2, height: 20, area: 200, stories: 4}
     * results in
     * { height: 15, area: 150 }
     *
     * @param ids
     * @param aggregateOperator
     * @return a promise set of aggregated values of the given attribute over the given IDs
     */
    aggregateByIds(ids: string[], aggregateOperator: AggregateOperator): Promise<{ kvp: KVP }>;
}

import {FetchResultSet} from "../core/FetchResultSet";
import {JSONObject} from "../util/JSONObject";
import {KVP} from "../util/KVP";
import {QBE} from "../util/QBE";
import {AggregateOperator} from "../util/AggregateOperator";

/**
 * Declares read-only functionalities of a data source.
 */
export interface ReadableDataSource {
    /**
     * Retrieves the meta properties of this data source.
     * The result is a JSON object.
     *
     * @protected
     */
    getMetaData(): Promise<JSONObject>;

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
     * @return a promise array of distinct strings containing attribute names
     */
    fetchAttributeNamesFromId(id: string): Promise<Set<string>>;

    /**
     * Fetches IDs from a given Query-By-Example expression.
     *
     * @param qbe
     * @param limit (optional) the maximum number of records should be fetched
     * @return a promise array of distinct strings containing IDs
     */
    fetchIdsFromQBE(qbe: QBE, limit?: number): Promise<Set<string>>;

    /**
     * Fetches IDs from a given array of Query-By-Example expressions.
     *
     * @param qbes an array of Query-By-Example expressions
     * @param limit (optional) the maximum number of records should be fetched
     * @return a promise array of distinct strings containing IDs
     */
    fetchIdsFromQBEs(qbes: Array<QBE>, limit?: number): Promise<Set<string>>;

    /**
     * Calculates the aggregated value of a given attribute from given IDs.
     *
     * @param ids
     * @param aggregateOperator
     * @param attributeName
     * @return a promise aggregated value of the given attribute over the given IDs
     */
    aggregateByIds(ids: Array<string>, aggregateOperator: AggregateOperator, attributeName: string): Promise<number>;

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
    aggregateByIds(ids: Array<string>, aggregateOperator: AggregateOperator): Promise<{ kvp: KVP }>;
}

import { FetchResultSet } from "../core/FetchResultSet";
import { JSONObject } from "../util/JSONObject";
import { KVP } from "../util/KVP";
import { QBE } from "../util/QBE";
import { AggregateOperator } from "../util/AggregateOperator";
export interface ReadableDataSource {
    getMetaData(): Promise<JSONObject>;
    fetchAttributeValuesFromId(id: string): Promise<FetchResultSet>;
    fetchAttributeNamesFromId(id: string): Promise<Set<string>>;
    fetchIdsFromQBE(qbe: QBE, limit?: number): Promise<Set<string>>;
    fetchIdsFromQBEs(qbes: Array<QBE>, limit?: number): Promise<Set<string>>;
    aggregateByIds(ids: Array<string>, aggregateOperator: AggregateOperator, attributeName: string): Promise<number>;
    aggregateByIds(ids: Array<string>, aggregateOperator: AggregateOperator): Promise<{
        kvp: KVP;
    }>;
}

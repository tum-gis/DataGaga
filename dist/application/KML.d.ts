import { NonFirstNormalFormDataSource, NonFirstNormalFormDataSourceOptions } from "../core/NonFirstNormalFormDataSource";
import { FetchResultSet } from "../core/FetchResultSet";
import { ReadableDataSource } from "../definition/ReadableDataSource";
import { JSONObject } from "../util/JSONObject";
import { KVP } from "../util/KVP";
import { QBE } from "../util/QBE";
import { AggregateOperator } from "../util/AggregateOperator";
import { ProxyDataSource } from "../definition/ProxyDataSource";
export declare const enum QueryableAttributeNamesKML {
    ID = "id",
    NAME = "name",
    VISIBILITY = "visibility",
    SIMPLEDATA_NAME = "simpledata_name",
    SIMPLEDATA_VALUE = "simpledata_value"
}
export declare class KML extends NonFirstNormalFormDataSource implements ReadableDataSource, ProxyDataSource {
    proxyPrefix: string;
    constructor(options: KMLOptions);
    getMetaData(): Promise<JSONObject>;
    aggregateByIds(ids: Array<string>, aggregateOperator: AggregateOperator, attributeName: string): Promise<number>;
    aggregateByIds(ids: Array<string>, aggregateOperator: AggregateOperator): Promise<{
        kvp: KVP;
    }>;
    fetchAttributeNamesFromId(id: string): Promise<Set<string>>;
    fetchAttributeValuesFromId(id: string): Promise<FetchResultSet>;
    fetchAttributeValuesFromName(name: string): Promise<FetchResultSet>;
    fetchIdsFromQBE(qbe: QBE, limit?: number): Promise<Set<string>>;
    fetchIdsFromQBEs(qbes: Array<QBE>, limit?: number): Promise<Set<string>>;
}
export interface KMLOptions extends NonFirstNormalFormDataSourceOptions {
    proxyPrefix: string;
}

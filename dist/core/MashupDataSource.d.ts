import { FetchResultSet } from "./FetchResultSet";
import { ReadableDataSource } from "../definition/ReadableDataSource";
import { KVP } from "../util/KVP";
import { JSONObject } from "../util/JSONObject";
import { QBE } from "../util/QBE";
import { AggregateOperator } from "../util/AggregateOperator";
import { DataSource, DataSourceOptions } from "./DataSource";
export declare class MashupDataSource extends DataSource implements ReadableDataSource {
    private _mashup;
    constructor(options: MashupDataSourceOptions, mashup?: Array<DataSource>);
    addDataSource(dataSource: DataSource): void;
    removeDataSource(index: number): void;
    size(): number;
    get(index: number): DataSource;
    get mashup(): Array<DataSource>;
    set mashup(value: Array<DataSource>);
    aggregateByIds(ids: Array<string>, aggregateOperator: AggregateOperator, attributeName: string): Promise<number>;
    aggregateByIds(ids: Array<string>, aggregateOperator: AggregateOperator): Promise<{
        kvp: KVP;
    }>;
    fetchAttributeNamesFromId(id: string): Promise<Set<string>>;
    fetchAttributeValuesFromId(id: string): Promise<FetchResultSet>;
    fetchIdsFromQBE(qbe: QBE, limit?: number): Promise<Set<string>>;
    fetchIdsFromQBEs(qbes: Array<QBE>, limit?: number): Promise<Set<string>>;
    getMetaData(): Promise<JSONObject>;
}
export interface MashupDataSourceOptions extends DataSourceOptions {
}

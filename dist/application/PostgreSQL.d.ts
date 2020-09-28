import { WritableDataSource } from "../definition/WritableDataSource";
import { KVP } from "../util/KVP";
import { FirstNormalFormDataSource, FirstNormalFormDataSourceOptions } from "../core/FirstNormalFormDataSource";
import { FetchResultSet } from "../core/FetchResultSet";
import { ReadableDataSource } from "../definition/ReadableDataSource";
import { JSONObject } from "../util/JSONObject";
import { QBE } from "../util/QBE";
import { SecuredDataSource } from "../definition/SecuredDataSource";
import { AggregateOperator } from "../util/AggregateOperator";
export declare class PostgreSQL extends FirstNormalFormDataSource implements ReadableDataSource, WritableDataSource, SecuredDataSource {
    private _idColName;
    constructor(options: PostgreSQLOptions);
    login(credentials: JSONObject): Promise<boolean>;
    logout(): Promise<boolean>;
    getMetaData(): Promise<JSONObject>;
    aggregateByIds(ids: Array<string>, aggregateOperator: AggregateOperator, attributeName: string): Promise<number>;
    aggregateByIds(ids: Array<string>, aggregateOperator: AggregateOperator): Promise<{
        kvp: KVP;
    }>;
    deleteAttributeOfId(id: string, attributeName: string): Promise<boolean>;
    deleteAttributesUsingQBE(qbe: QBE, attributeNames: Array<string>): Promise<boolean>;
    deleteObjectOfId(id: string): Promise<boolean>;
    deleteObjectsUsingQBE(qbe: QBE): Promise<boolean>;
    fetchAttributeNamesFromId(id: string): Promise<Set<string>>;
    fetchAttributeValuesFromId(id: string): Promise<FetchResultSet>;
    fetchIdsFromQBE(qbe: QBE, limit?: number): Promise<Set<string>>;
    fetchIdsFromQBEs(qbes: Array<QBE>, limit?: number): Promise<Set<string>>;
    insertAttributeOfId(id: string, attributeName: string, attributeValue: any): Promise<boolean>;
    insertAttributesUsingQBE(qbe: QBE, newAttributes: KVP): Promise<boolean>;
    insertNewObject(json: JSONObject): Promise<boolean>;
    updateAttributeValueOfId(id: string, attributeName: string, newValue: any): Promise<boolean>;
    updateAttributeValuesUsingQBE(qbe: QBE, newAttributeValues: KVP): Promise<boolean>;
}
export interface PostgreSQLOptions extends FirstNormalFormDataSourceOptions {
    idColName: string;
}

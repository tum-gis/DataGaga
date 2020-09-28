import { FirstNormalFormDataSource, FirstNormalFormDataSourceOptions } from "../core/FirstNormalFormDataSource";
import { WritableDataSource } from "../definition/WritableDataSource";
import { KVP } from "../util/KVP";
import { FetchResultSet } from "../core/FetchResultSet";
import { ReadableDataSource } from "../definition/ReadableDataSource";
import { JSONObject } from "../util/JSONObject";
import { QBE } from "../util/QBE";
import { SecuredDataSource } from "../definition/SecuredDataSource";
import { AggregateOperator } from "../util/AggregateOperator";
export declare class GoogleSheets extends FirstNormalFormDataSource implements ReadableDataSource, WritableDataSource, SecuredDataSource {
    private static apiUrlPrefix;
    private _spreadsheetId;
    private _a1Notation;
    constructor(options: GoogleSheetsOptions);
    getMetaData(): Promise<JSONObject>;
    fetchAttributeValuesFromId(id: string): Promise<FetchResultSet>;
    fetchAttributeNamesFromId(id: string): Promise<Set<string>>;
    fetchIdsFromQBE(qbe: QBE, limit?: number): Promise<Set<string>>;
    fetchIdsFromQBEs(qbes: Array<QBE>, limit?: number): Promise<Set<string>>;
    aggregateByIds(ids: Array<string>, aggregateOperator: AggregateOperator, attributeName: string): Promise<number>;
    aggregateByIds(ids: Array<string>, aggregateOperator: AggregateOperator): Promise<{
        kvp: KVP;
    }>;
    get spreadsheetId(): string;
    set spreadsheetId(value: string);
    deleteAttributeOfId(id: string, attributeName: string): Promise<boolean>;
    deleteAttributesUsingQBE(qbe: QBE, attributeNames: Array<string>): Promise<boolean>;
    deleteObjectOfId(id: string): Promise<boolean>;
    deleteObjectsUsingQBE(qbe: QBE): Promise<boolean>;
    insertAttributeOfId(id: string, attributeName: string, attributeValue: any): Promise<boolean>;
    insertAttributesUsingQBE(qbe: QBE, newAttributes: KVP): Promise<boolean>;
    insertNewObject(json: JSONObject): Promise<boolean>;
    login(credentials: JSONObject): Promise<boolean>;
    logout(): Promise<boolean>;
    updateAttributeValueOfId(id: string, attributeName: string, newValue: any): Promise<boolean>;
    updateAttributeValuesUsingQBE(qbe: QBE, newAttributeValues: KVP): Promise<boolean>;
}
export interface GoogleSheetsOptions extends FirstNormalFormDataSourceOptions {
    spreadsheetId: string;
    a1Notation: string;
}

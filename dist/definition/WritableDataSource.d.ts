import { KVP } from "../util/KVP";
import { QBE } from "../util/QBE";
import { JSONObject } from "../util/JSONObject";
export interface WritableDataSource {
    updateAttributeValueOfId(id: string, attributeName: string, newValue: any): Promise<boolean>;
    updateAttributeValuesUsingQBE(qbe: QBE, newAttributeValues: KVP): Promise<boolean>;
    insertAttributeOfId(id: string, attributeName: string, attributeValue: any): Promise<boolean>;
    insertAttributesUsingQBE(qbe: QBE, newAttributes: KVP): Promise<boolean>;
    insertNewObject(json: JSONObject): Promise<boolean>;
    deleteObjectOfId(id: string): Promise<boolean>;
    deleteAttributeOfId(id: string, attributeName: string): Promise<boolean>;
    deleteAttributesUsingQBE(qbe: QBE, attributeNames: Array<string>): Promise<boolean>;
    deleteObjectsUsingQBE(qbe: QBE): Promise<boolean>;
}

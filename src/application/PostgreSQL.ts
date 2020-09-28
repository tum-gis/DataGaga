import {WritableDataSource} from "../definition/WritableDataSource";
import {KVP} from "../util/KVP";
import {FirstNormalFormDataSource, FirstNormalFormDataSourceOptions} from "../core/FirstNormalFormDataSource";
import {FetchResultSet} from "../core/FetchResultSet";
import {WebUtil} from "../util/WebUtil";
import {DataSourceCapabilities} from "../util/DataSourceCapabilities";
import {ReadableDataSource} from "../definition/ReadableDataSource";
import {JSONObject} from "../util/JSONObject";
import {QBE} from "../util/QBE";
import {SecuredDataSource} from "../definition/SecuredDataSource";
import {AggregateOperator} from "../util/AggregateOperator";
import {DataSourceType} from "../controller/DataGaga";

/**
 * Implementation for PostgreSQL as data source.
 */
export class PostgreSQL extends FirstNormalFormDataSource implements ReadableDataSource, WritableDataSource, SecuredDataSource {
    /**
     * The name of the column containing the IDs of objects.
     * Normally this is the first column of a table (e.g. gmlid).
     *
     * @private
     */
    private _idColName: string;

    /**
     * A constructor to instantiate a PostgreSQL object.
     * This requires an object options with the following structure
     *
     *
     * |    Attribute name      |   Data type               |   Default value           |
     * |------------------------|---------------------------|---------------------------|
     * |    name                |   string                  |   My data source name     |
     * |    provider            |   string                  |   My data source provider |
     * |    uri                 |   string                  |   **REQUIRED**            |
     * |    dataStructureType   |   DataStructureType       |   **REQUIRED**            |
     *
     * @param options an object containing the required information
     *
     */
    public constructor(options: PostgreSQLOptions) {
        super(options);

        // Initialize capabilities
        let capabilitiesOptions: DataSourceCapabilities = {
            webCapabilities: {
                restAPI: true
            },
            dbTransactionCapabilities: {
                read: true,
                insert: true,
                delete: true,
                update: true
            },
            securityCapabilities: {
                oauth: true
            }
        };
        this._capabilities = capabilitiesOptions;

        this._dataSourceType = DataSourceType.PostgreSQL;

        this._idColName = (options.idColName == null) ? "gmlid" : options.idColName;
    }

    public login(credentials: JSONObject): Promise<boolean> {
        // TODO
        throw new Error("Method not implemented.");
    }

    public logout(): Promise<boolean> {
        // TODO
        throw new Error("Method not implemented.");
    }

    public getMetaData(): Promise<JSONObject> {
        // TODO
        throw new Error("Method not implemented.");
    }

    public aggregateByIds(ids: Array<string>, aggregateOperator: AggregateOperator, attributeName: string): Promise<number>;
    public aggregateByIds(ids: Array<string>, aggregateOperator: AggregateOperator): Promise<{ kvp: KVP }>;
    public aggregateByIds(ids: Array<string>, aggregateOperator: AggregateOperator, attributeName?: string): Promise<number> | Promise<{ kvp: KVP }> {
        // TODO
        throw new Error("Method not implemented.");
    }

    public deleteAttributeOfId(id: string, attributeName: string): Promise<boolean> {
        // TODO
        throw new Error("Method not implemented.");
    }

    public deleteAttributesUsingQBE(qbe: QBE, attributeNames: Array<string>): Promise<boolean> {
        // TODO
        throw new Error("Method not implemented.");
    }

    public deleteObjectOfId(id: string): Promise<boolean> {
        // TODO
        throw new Error("Method not implemented.");
    }

    public deleteObjectsUsingQBE(qbe: QBE): Promise<boolean> {
        // TODO
        throw new Error("Method not implemented.");
    }

    public fetchAttributeNamesFromId(id: string): Promise<Set<string>> {
        // TODO
        throw new Error("Method not implemented.");
    }

    public fetchAttributeValuesFromId(id: string): Promise<FetchResultSet> {
        let scope = this;
        return new Promise(function (resolve, reject) {
            WebUtil.httpGet(scope._uri + "?" + scope._idColName + "=eq." + id).then(function (result) {
                let fetchResultSet = new FetchResultSet(result);
                resolve(fetchResultSet);
            }).catch(function (error) {
                reject(error);
            })
        });
    }

    public fetchIdsFromQBE(qbe: QBE, limit?: number): Promise<Set<string>> {
        // TODO
        throw new Error("Method not implemented.");
    }

    public fetchIdsFromQBEs(qbes: Array<QBE>, limit?: number): Promise<Set<string>> {
        // TODO
        throw new Error("Method not implemented.");
    }

    public insertAttributeOfId(id: string, attributeName: string, attributeValue: any): Promise<boolean> {
        // TODO
        throw new Error("Method not implemented.");
    }

    public insertAttributesUsingQBE(qbe: QBE, newAttributes: KVP): Promise<boolean> {
        // TODO
        throw new Error("Method not implemented.");
    }

    public insertNewObject(json: JSONObject): Promise<boolean> {
        // TODO
        throw new Error("Method not implemented.");
    }

    public updateAttributeValueOfId(id: string, attributeName: string, newValue: any): Promise<boolean> {
        // TODO
        throw new Error("Method not implemented.");
    }

    public updateAttributeValuesUsingQBE(qbe: QBE, newAttributeValues: KVP): Promise<boolean> {
        // TODO
        throw new Error("Method not implemented.");
    }
}

export interface PostgreSQLOptions extends FirstNormalFormDataSourceOptions {
    idColName: string;
}
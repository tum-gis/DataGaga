///<reference path="../core/SQLDataSource.ts"/>

/**
 * Implementation for PostgreSQL as data source.
 */
class PostgreSQL extends SQLDataSource implements ReadableDataSource, WritableDataSource {
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
    constructor(options) {
        super(options);

        // Initialize capabilities
        let capabilitiesOptions: DataSourceCapabilities = new DataSourceCapabilities({
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
        });
        this._capabilities = capabilitiesOptions;

        this._dataSourceType = DataSourceType.PostgreSQL;

        DataSourceUtil.initAttribute(this, "_idColName", options.idColName, "gmlid");
    }

    getMetaData(): Promise<any> {
        // TODO
        return Promise.resolve(undefined);
    }

    aggregateByIds(ids: string[], aggregateOperator: AggregateOperator, attributeName: string): Promise<number>;
    aggregateByIds(ids: string[], aggregateOperator: AggregateOperator): Promise<{ kvp: KVP }>;
    aggregateByIds(ids: string[], aggregateOperator: AggregateOperator, attributeName?: string): Promise<number> | Promise<{ kvp: KVP }> {
        // TODO
        return Promise.resolve(0);
    }

    deleteAttributeOfId(id: string, attributeName: string): Promise<boolean> {
        // TODO
        return Promise.resolve(false);
    }

    deleteAttributesUsingQBE(qbe: QBE, attributeNames: string[]): Promise<boolean> {
        // TODO
        return Promise.resolve(false);
    }

    deleteObjectOfId(id: string): Promise<boolean> {
        // TODO
        return Promise.resolve(false);
    }

    deleteObjectsUsingQBE(qbe: QBE): Promise<boolean> {
        // TODO
        return Promise.resolve(false);
    }

    fetchAttributeNamesFromId(id: string): Promise<string[]> {
        // TODO
        return Promise.resolve([]);
    }

    fetchAttributeValuesFromId(id: string): Promise<FetchResultSet> {
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

    fetchIdsFromQBE(qbe: QBE, limit?: number): Promise<string[]> {
        // TODO
        return Promise.resolve([]);
    }

    insertAttributeOfId(id: string, attributeName: string, attributeValue: any): Promise<boolean> {
        // TODO
        return Promise.resolve(false);
    }

    insertAttributesUsingQBE(qbe: QBE, newAttributes: KVP): Promise<boolean> {
        // TODO
        return Promise.resolve(false);
    }

    insertNewObject(kvp: KVP): Promise<boolean> {
        // TODO
        return Promise.resolve(false);
    }

    updateAttributeValueOfId(id: string, attributeName: string, newValue: any): Promise<boolean> {
        // TODO
        return Promise.resolve(false);
    }

    updateAttributeValuesUsingQBE(qbe: QBE, newAttributeValues: KVP): Promise<boolean> {
        // TODO
        return Promise.resolve(false);
    }
}

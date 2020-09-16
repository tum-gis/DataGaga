///<reference path="../core/SQLDataSource.ts"/>

/**
 * Implementation for GoogleSheets as data source.
 */
class GoogleSheets extends SQLDataSource implements ReadableDataSource, WritableDataSource, SecuredDataSource {
    private static apiUrlPrefix: string = "https://sheets.googleapis.com/v4/spreadsheets/";

    /**
     * The ID of the spreadsheet.
     *
     * @private
     */
    private _spreadsheetId: string;

    /**
     * The A1 notation referring to a group of cells in the spreadsheet.
     * More info: https://developers.google.com/sheets/api/guides/concepts#a1_notation.
     *
     * @private
     */
    private _a1Notation: string; // TODO

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
     * |    a1Notation          |   string                  |   A                       |
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

        this._dataSourceType = DataSourceType.GoogleSheets;

        this._spreadsheetId = options.uri.replace(/.+?(spreadsheets\/d\/)/, "").replace(/(?=\/edit).+/, "");

        // An A1 notation is something like "Sheet1!A1:B2", if none is given then "A" (first sheet) is used
        DataSourceUtil.initAttribute(this, "_a1Notation", options.a1Notation, "A");
    }

    getMetaData(): Promise<any> {
        // TODO
        let scope = this;
        return new Promise(function (resolve, reject) {
            WebUtil.httpGet(GoogleSheets.apiUrlPrefix + scope._spreadsheetId + "?&fields=sheets.properties").then(function (result) {
                resolve(result);
            }).catch(function (error) {
                reject(error);
            })
        });
    }

    fetchAttributeValuesFromId(id: string): Promise<FetchResultSet> {
        let scope = this;
        return new Promise(function (resolve, reject) {
            let baseUrl = "https://docs.google.com/spreadsheets/d/";
            let sql = "SELECT * WHERE A='" + id + "'"; // TODO
            WebUtil.httpGet(baseUrl + scope._spreadsheetId + "/gviz/tq?tq=" + encodeURI(sql)).then(function (result) {
                // The response is in JSON but contains the following string:
                // "/*O_o*/google.visualization.Query.setResponse({status:ok, ...})"
                // https://developers.google.com/chart/interactive/docs/dev/implementing_data_source#jsondatatable
                // The Google Visualization API is used here for querying data from Google Spreadsheets
                // https://developers.google.com/chart/interactive/docs/querylanguage#setting-the-query-in-the-data-source-url
                let jsonResult = JSON.parse(result.replace("/*O_o*/", "").replace(/(google\.visualization\.Query\.setResponse\(|\);$)/g, ""));

                // cols[i].label contain all values of each column (incl. column names)
                // these are separated by space, which makes it hard to parse a column that has space in its name
                // therefore, we extract the first entries of the labels for the column names
                // then proceed to extract the values from rows
                // this can be applied to both vertical and horizontal table type
                /*
                    cols = [
                        {
                            id: "A",
                            label: "Col0_Name Col0_Row1 Col0_Row2 ...",
                            type: string
                        },
                        {
                            id: "B",
                            label: "Col1_Name Col1_Row1 Col1_Row2 ...",
                            type: string
                        },
                        {
                            id: "C",
                            label: "Col2_Name Col2_Row1 Col2_Row2 ...",
                            type: string
                        }
                    ]

                    rows = [
                        c: [
                            {
                                v: Col0_Row1
                            },
                            {
                                v: Col1_Row1
                            },
                            {
                                v: Col2_Row1
                            }
                        ],
                        c: [
                            {
                                v: Col0_Row2
                            },
                            {
                                v: Col1_Row2
                            },
                            {
                                v: Col2_Row2
                            }
                        ],
                        c: [
                            {
                                v: Col0_Row3
                            },
                            {
                                v: Col1_Row3
                            },
                            {
                                v: Col2_Row3
                            }
                        ],
                        ...
                    ]
                 */
                let cols = jsonResult.table.cols;
                let rows = jsonResult.table.rows;

                let fetchResultSet: FetchResultSet = new FetchResultSet([]);
                let keys = [];
                for (let i = 0; i < cols.length; i++) {
                    keys[i] = cols[i].label.split(" ")[0];
                }
                for (let i = 0; i < rows.length; i++) {
                    let kvp = {};
                    for (let j = 0; j < rows[i].c.length; j++) {
                        // the cols.length and rows[i].c.length mus be the same
                        kvp[keys[j]] = rows[i].c[j] == null ? "" : rows[i].c[j]["v"];
                    }
                    fetchResultSet.push(kvp);
                }
                resolve(fetchResultSet);
            }).catch(function (error) {
                reject(error);
            })
        });
    }

    fetchAttributeNamesFromId(id: string): Promise<string[]> {
        throw new Error("Method not implemented.");
    }

    fetchIdsFromQBE(qbe: QBE, limit?: number): Promise<string[]> {
        throw new Error("Method not implemented.");
    }

    aggregateByIds(ids: string[], aggregateOperator: AggregateOperator, attributeName: string): Promise<number>;
    aggregateByIds(ids: string[], aggregateOperator: AggregateOperator): Promise<{ kvp: KVP }>;
    aggregateByIds(ids: string[], aggregateOperator: AggregateOperator, attributeName?: string): Promise<number> | Promise<{ kvp: KVP }> {
        // TODO
        return Promise.resolve(0);
    }

    get spreadsheetId(): string {
        return this._spreadsheetId;
    }

    set spreadsheetId(value: string) {
        this._spreadsheetId = value;
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

    login(credentials: any): Promise<boolean> {
        // TODO
        return Promise.resolve(false);
    }

    logout(): Promise<boolean> {
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

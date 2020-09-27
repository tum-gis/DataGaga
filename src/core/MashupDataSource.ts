/**
 * A mashup storing multiple data sources as one.
 */
class MashupDataSource extends DataSource implements ReadableDataSource {
    /**
     * Stores multiple data sources and considers them as one.
     *
     * @private
     */
    private _mashup: Array<DataSource>;

    public constructor(options: MashupDataSourceOptions, mashup?: Array<DataSource>) {
        super(options);
        if (mashup != null) {
            this._mashup = mashup;
        } else {
            this._mashup = [];
        }
    }

    /**
     * Adds a data source to the mashup one.
     *
     * @param dataSource
     */
    public addDataSource(dataSource: DataSource): void {
        if (dataSource != null) {
            this._mashup.push(dataSource);
        }
    }

    /**
     * Removes a data source from mashup.
     *
     * @param index position (>= 0) of the data source to be removed
     */
    public removeDataSource(index: number): void {
        if (index != null && index >= 0 && index < this._mashup.length) {
            this._mashup.splice(index, 1);
        }
    }

    /**
     * Gives the size of the mashup data source.
     *
     * @return length of the mashup data source
     */
    public size(): number {
        return this._mashup.length;
    }

    /**
     * Returns a unit data source at a given index.
     *
     * @param index
     * @return a unit data source
     */
    public get(index: number): DataSource {
        return this._mashup[index];
    }

    public get mashup(): Array<DataSource> {
        return this._mashup;
    }

    public set mashup(value: Array<DataSource>) {
        this._mashup = value;
    }

    public aggregateByIds(ids: Array<string>, aggregateOperator: AggregateOperator, attributeName: string): Promise<number>;
    public aggregateByIds(ids: Array<string>, aggregateOperator: AggregateOperator): Promise<{ kvp: KVP }>;
    public aggregateByIds(ids: Array<string>, aggregateOperator: AggregateOperator, attributeName?: string): Promise<number> | Promise<{ kvp: KVP }> {
        // TODO
        throw new Error("Method not implemented.");
    }

    public fetchAttributeNamesFromId(id: string): Promise<Set<string>> {
        // TODO
        throw new Error("Method not implemented.");
    }

    public fetchAttributeValuesFromId(id: string): Promise<FetchResultSet> {
        let scope = this;
        let result = new FetchResultSet([]);
        let promises = new Array<Promise<FetchResultSet>>();
        for (let datasource of scope._mashup) {
            // Check if this object has a function (since interface can only checked by instanceof in TS in runtime)
            // @ts-ignore
            if (typeof datasource["fetchAttributeValuesFromId"] === "function") {
                // @ts-ignore
                promises.push(datasource["fetchAttributeValuesFromId"](id));
            }
        }

        return new Promise(function (resolve, reject) {
                Promise.all(promises).then(function (fetchResultSets) {
                    for (let fetchResultSet of fetchResultSets) {
                        result.concat(fetchResultSet);
                    }
                    if (result.size() >= 0) {
                        resolve(result);
                    } else {
                        reject("Could not fetch for this mashup.")
                    }
                }).catch(function (error) {
                    reject(error);
                })
            }
        )
    }

    public fetchIdsFromQBE(qbe: QBE, limit ?: number): Promise<Set<string>> {
        // TODO
        throw new Error("Method not implemented.");
    }

    public fetchIdsFromQBEs(qbes: Array<QBE>, limit ?: number): Promise<Set<string>> {
        // TODO
        throw new Error("Method not implemented.");
    }

    public getMetaData(): Promise<JSONObject> {
        // TODO
        throw new Error("Method not implemented.");
    }
}

interface MashupDataSourceOptions extends DataSourceOptions {
}
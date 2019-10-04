enum DataSourceTypes {
    GoogleSheets = "GoogleSheets",
    PostgreSQL = "PostgreSQL"
}

class DataSourceController {

    private _datasource: DataSource;
    private _options: any;

    constructor(selectedDataSource: string, options: any) {
        this._options = options;
        if (selectedDataSource == DataSourceTypes.GoogleSheets) {
            this._datasource = new GoogleSheets(this._options);
        } else if (selectedDataSource == DataSourceTypes.PostgreSQL) {
            this._datasource = new PostgreSQL(this._options);
        }
    }

    fetchData(sql: string, callback: (queryResult: string) => any, limit?: number): Map<string, string> {
        const result = this._datasource.queryUsingSql(sql, callback, limit);
        const resultKvp = this._datasource.responseToKvp(result);

        return resultKvp;
    }

    get datasource(): DataSource {
        return this._datasource;
    }

    set datasource(value: DataSource) {
        this._datasource = value;
    }

}
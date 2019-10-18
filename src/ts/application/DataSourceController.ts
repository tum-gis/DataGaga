enum DataSourceTypes {
    GoogleSheets = "GoogleSheets",
    PostgreSQL = "PostgreSQL"
}

class DataSourceController {
    private _datasource: DataSource;
    private _options: any;

    constructor(selectedDataSource: string, options: any) {
        let scope = this;
        scope._options = options;
        if (selectedDataSource == DataSourceTypes.GoogleSheets) {
            scope._datasource = new GoogleSheets(scope._options);
        } else if (selectedDataSource == DataSourceTypes.PostgreSQL) {
            scope._datasource = new PostgreSQL(scope._options);
        }
    }

    fetchData(id: string, callback: (queryResultKvp: Map<string, string>) => any, limit?: number) {
        let scope = this;
        scope._datasource.queryUsingId(id, function (result) {
            callback(scope._datasource.responseToKvp(result));
        }, limit);
    }

    get datasource(): DataSource {
        return this._datasource;
    }

    set datasource(value: DataSource) {
        this._datasource = value;
    }

    get options(): any {
        return this._options;
    }

    set options(value: any) {
        this._options = value;
    }
}
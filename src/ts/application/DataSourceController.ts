enum DataSourceTypes {
    GoogleSheets = "GoogleSheets",
    PostgreSQL = "PostgreSQL"
}

enum TableTypes {
    Horizontal = "Horizontal",
    Vertical = "Vertical"
}

class DataSourceController {
    private _dataSource: DataSource;

    private _options: any;
    constructor(selectedDataSource: string, options: any) {
        let scope = this;
        scope._options = options;
        if (selectedDataSource == DataSourceTypes.GoogleSheets) {
            scope._dataSource = new GoogleSheets(scope._options);
        } else if (selectedDataSource == DataSourceTypes.PostgreSQL) {
            scope._dataSource = new PostgreSQL(scope._options);
        }
    }

    fetchData(id: string, callback: (queryResultKvp: Map<string, string>) => any, limit?: number) {
        let scope = this;
        scope._dataSource.queryUsingId(id, function (result) {
            callback(scope._dataSource.responseToKvp(result));
        }, limit);
    }

    get dataSource(): DataSource {
        return this._dataSource;
    }

    set dataSource(value: DataSource) {
        this._dataSource = value;
    }

    get options(): any {
        return this._options;
    }

    set options(value: any) {
        this._options = value;
    }

}
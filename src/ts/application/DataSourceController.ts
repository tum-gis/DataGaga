enum DataSourceTypes {
    GoogleSheets = "GoogleSheets",
    PostgreSQL = "PostgreSQL",
    KML = "KML"
}

enum TableTypes {
    Horizontal = "Horizontal",
    Vertical = "Vertical"
}

enum ThirdPartyHandler {
    Cesium = "Cesium"
}

class DataSourceController {
    private _dataSource: DataSource;

    private _options: any;
    constructor(selectedDataSource: string, signInController: any, options: any) {
        let scope = this;
        scope._options = options;
        if (selectedDataSource == DataSourceTypes.GoogleSheets) {
            scope._dataSource = new GoogleSheets(signInController, scope._options);
        } else if (selectedDataSource == DataSourceTypes.PostgreSQL) {
            scope._dataSource = new PostgreSQL(signInController, scope._options);
        } else if (selectedDataSource == DataSourceTypes.KML) {
            scope._dataSource = new KMLDataSource(signInController, scope._options);
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
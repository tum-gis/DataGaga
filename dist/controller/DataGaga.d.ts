import { DataSource } from "../core/DataSource";
export declare const enum DataSourceType {
    Mashup = "Mashup",
    GoogleSheets = "GoogleSheets",
    PostgreSQL = "PostgreSQL",
    KML = "KML"
}
export declare class DataGaga {
    static createDataSource(dataSourceType: string | DataSourceType, options: any): DataSource;
}

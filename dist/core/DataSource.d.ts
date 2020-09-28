import { DataSourceCapabilities } from "../util/DataSourceCapabilities";
import { DataSourceType } from "../controller/DataGaga";
export declare abstract class DataSource {
    protected _name: string;
    protected _dataSourceType: DataSourceType;
    protected _capabilities: DataSourceCapabilities;
    constructor(options: DataSourceOptions);
    get name(): string;
    set name(value: string);
    get dataSourceType(): DataSourceType;
    set dataSourceType(value: DataSourceType);
    get capabilities(): DataSourceCapabilities;
    set capabilities(value: DataSourceCapabilities);
}
export interface DataSourceOptions {
    name: string;
    dataSourceType: DataSourceType;
    capabilities: DataSourceCapabilities;
}

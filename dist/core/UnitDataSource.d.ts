import { DataSource, DataSourceOptions } from "./DataSource";
export declare abstract class UnitDataSource extends DataSource {
    protected _provider: string;
    protected _uri: string;
    protected constructor(options: UnitDataSourceOptions);
    get provider(): string;
    set provider(value: string);
    get uri(): string;
    set uri(value: string);
}
export interface UnitDataSourceOptions extends DataSourceOptions {
    provider: string;
    uri: string;
}

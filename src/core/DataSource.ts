import {DataSourceCapabilities} from "../util/DataSourceCapabilities";
import {DataSourceType} from "../controller/DataGaga";

/**
 * A base class for all data sources.
 */
export abstract class DataSource {
    /**
     * An easy-to-rember name of the data source.
     *
     * @protected
     */
    protected _name: string;

    /**
     * The type of this data source.
     *
     * @protected
     */
    protected _dataSourceType: DataSourceType;

    /**
     * Capabilities of the service hosting this data source.
     *
     * @protected
     */
    protected _capabilities: DataSourceCapabilities;

    /**
     * Constructor.
     *
     * @param options an object containing attributes defined in this class
     * @protected
     */
    constructor(options: DataSourceOptions) {
        this._name = (options.name == null) ? "My data source name" : options.name;
        this._dataSourceType = (options.dataSourceType == null) ? DataSourceType.PostgreSQL : options.dataSourceType;
        this._capabilities = (options.capabilities == null) ? {
            webCapabilities: {
                restAPI: false
            },
            dbTransactionCapabilities: {
                read: true,
                insert: false,
                delete: false,
                update: false
            },
            securityCapabilities: {
                oauth: false
            }
        } : options.capabilities;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get dataSourceType(): DataSourceType {
        return this._dataSourceType;
    }

    public set dataSourceType(value: DataSourceType) {
        this._dataSourceType = value;
    }

    public get capabilities(): DataSourceCapabilities {
        return this._capabilities;
    }

    public set capabilities(value: DataSourceCapabilities) {
        this._capabilities = value;
    }
}

export interface DataSourceOptions {
    name: string;
    dataSourceType: DataSourceType;
    capabilities: DataSourceCapabilities;
}
///<reference path="DataSource.ts"/>

/**
 * A base class for all unit data sources that can be combined to form a mashup.
 */
abstract class UnitDataSource extends DataSource {
    /**
     * The provider of this data source.
     *
     * @protected
     */
    protected _provider: string;

    /**
     * The URI to the resource hosted on the web.
     *
     * @protected
     */
    protected _uri: string;

    /**
     * Constructor.
     *
     * @param options an object containing attributes defined in this class
     * @protected
     */
    protected constructor(options: UnitDataSourceOptions) {
        super(options);
        this._provider = (options.provider == null) ? "My data source provider" : options.provider;
        this._uri = (options.uri == null) ? "" : options.uri;
    }

    public get provider(): string {
        return this._provider;
    }

    public set provider(value: string) {
        this._provider = value;
    }

    public get uri(): string {
        return this._uri;
    }

    public set uri(value: string) {
        this._uri = value;
    }
}

interface UnitDataSourceOptions extends DataSourceOptions {
    provider: string;
    uri: string;
}
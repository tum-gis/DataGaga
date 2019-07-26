// In TypeScript if abstract class B implements interface A,
// it must either implement functions from A or declare them as abstract.
// https://github.com/Microsoft/TypeScript/issues/4670
// Alternatively we can do this:
interface DataSource extends ReadableDataSource, WritableDataSource {}

abstract class DataSource implements ReadableDataSource, WritableDataSource {
    private _capabilities: DataSourceCapabilitiy[];
    private _name: string;
    private _provider: string;
    private _type: string;
    private _uri: string;

    get capabilities(): DataSourceCapabilitiy[] {
        return this._capabilities;
    }

    set capabilities(value: DataSourceCapabilitiy[]) {
        this._capabilities = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get provider(): string {
        return this._provider;
    }

    set provider(value: string) {
        this._provider = value;
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    get uri(): string {
        return this._uri;
    }

    set uri(value: string) {
        this._uri = value;
    }

}
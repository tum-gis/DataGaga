abstract class MashupDataSource extends DataSource {
    private _mashupDataSources: Array<DataSource>;

    get mashupDataSources(): Array<DataSource> {
        return this._mashupDataSources;
    }

    set mashupDataSources(value: Array<DataSource>) {
        this._mashupDataSources = value;
    }

}

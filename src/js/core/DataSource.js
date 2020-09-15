var DataSource = (function () {
    function DataSource(options) {
        Util.initAttribute(this, "_name", options.name, "My data source name");
        Util.initAttribute(this, "_provider", options.provider, "My data source provider");
        Util.initAttribute(this, "_dataSourceType", options.provider, DataSourceType.PostgreSQL);
        Util.initAttribute(this, "_uri", options.uri, "");
        Util.initAttribute(this, "_capabilities", options.capabilities, undefined);
        Util.initAttribute(this, "_dataStructureType", options.dataStructureType, 0);
    }
    Object.defineProperty(DataSource.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataSource.prototype, "provider", {
        get: function () {
            return this._provider;
        },
        set: function (value) {
            this._provider = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataSource.prototype, "dataSourceType", {
        get: function () {
            return this._dataSourceType;
        },
        set: function (value) {
            this._dataSourceType = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataSource.prototype, "uri", {
        get: function () {
            return this._uri;
        },
        set: function (value) {
            this._uri = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataSource.prototype, "capabilities", {
        get: function () {
            return this._capabilities;
        },
        set: function (value) {
            this._capabilities = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataSource.prototype, "dataStructureType", {
        get: function () {
            return this._dataStructureType;
        },
        set: function (value) {
            this._dataStructureType = value;
        },
        enumerable: false,
        configurable: true
    });
    return DataSource;
}());

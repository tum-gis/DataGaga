/**
 * Capabilities of a data source.
 */
class DataSourceCapabilities {
    /**
     * Capabilities of connecting to the web.
     *
     * @private
     */
    private _webCapabilities: WebCapabilities;

    /**
     * Capabilities of performing transactional database operations.
     *
     * @private
     */
    private _dbTransactionCapabilities: DBTransactionCapabilities;

    /**
     * Capabilities of securing data.
     * @private
     */
    private _securityCapabilities: SecurityCapabilities;

    public constructor(options: any) {
        this._webCapabilities = options.webCapabilities;
        this._dbTransactionCapabilities = options.dbTransactionCapabilities;
        this._securityCapabilities = options.securityCapabilities;
    }

    public get webCapabilities(): WebCapabilities {
        return this._webCapabilities;
    }

    public set webCapabilities(value: WebCapabilities) {
        this._webCapabilities = value;
    }

    public get dbTransactionCapabilities(): DBTransactionCapabilities {
        return this._dbTransactionCapabilities;
    }

    public set dbTransactionCapabilities(value: DBTransactionCapabilities) {
        this._dbTransactionCapabilities = value;
    }

    public get securityCapabilities(): SecurityCapabilities {
        return this._securityCapabilities;
    }

    public set securityCapabilities(value: SecurityCapabilities) {
        this._securityCapabilities = value;
    }
}

interface WebCapabilities {
    restAPI: boolean
}

interface DBTransactionCapabilities {
    read: boolean,
    insert: boolean,
    delete: boolean,
    update: boolean
}

interface SecurityCapabilities {
    oauth: boolean
}
class DataSourceCapabilities {
    private _webCapabilities: WebCapabilities;
    private _dbTransactionCapabilities: DBTransactionCapabilities;
    private _securityCapabilities: SecurityCapabilities;

    constructor(options: any) {
        this._webCapabilities = options.webCapabilities;
        this._dbTransactionCapabilities = options.dbTransactionCapabilities;
        this._securityCapabilities = options.securityCapabilities;
    }

    get webCapabilities(): WebCapabilities {
        return this._webCapabilities;
    }

    set webCapabilities(value: WebCapabilities) {
        this._webCapabilities = value;
    }

    get dbTransactionCapabilities(): DBTransactionCapabilities {
        return this._dbTransactionCapabilities;
    }

    set dbTransactionCapabilities(value: DBTransactionCapabilities) {
        this._dbTransactionCapabilities = value;
    }

    get securityCapabilities(): SecurityCapabilities {
        return this._securityCapabilities;
    }

    set securityCapabilities(value: SecurityCapabilities) {
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
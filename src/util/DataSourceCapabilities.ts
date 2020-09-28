/**
 * Capabilities of a data source.
 */
export interface DataSourceCapabilities {
    /**
     * Capabilities of connecting to the web.
     *
     */
    webCapabilities: WebCapabilities;

    /**
     * Capabilities of performing transactional database operations.
     *
     */
    dbTransactionCapabilities: DBTransactionCapabilities;

    /**
     * Capabilities of securing data.
     */
    securityCapabilities: SecurityCapabilities;
}

export interface WebCapabilities {
    restAPI: boolean
}

export interface DBTransactionCapabilities {
    read: boolean,
    insert: boolean,
    delete: boolean,
    update: boolean
}

export interface SecurityCapabilities {
    oauth: boolean
}
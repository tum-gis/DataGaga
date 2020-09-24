/**
 * Capabilities of a data source.
 */
interface DataSourceCapabilities {
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
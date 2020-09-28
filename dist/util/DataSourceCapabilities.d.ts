export interface DataSourceCapabilities {
    webCapabilities: WebCapabilities;
    dbTransactionCapabilities: DBTransactionCapabilities;
    securityCapabilities: SecurityCapabilities;
}
export interface WebCapabilities {
    restAPI: boolean;
}
export interface DBTransactionCapabilities {
    read: boolean;
    insert: boolean;
    delete: boolean;
    update: boolean;
}
export interface SecurityCapabilities {
    oauth: boolean;
}

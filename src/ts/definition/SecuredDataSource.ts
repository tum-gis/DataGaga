interface SecuredDataSource {
    login(credentials: any): Promise<boolean>;

    logout(): Promise<boolean>;
}

interface SecuredDataSource {
    login(credentials: any): void;

    logout(): void;
}

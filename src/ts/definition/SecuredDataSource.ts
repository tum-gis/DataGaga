interface SecuredDataSource {
    login(credentials: JSONObject): Promise<boolean>;

    logout(): Promise<boolean>;
}

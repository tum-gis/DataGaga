import { JSONObject } from "../util/JSONObject";
export interface SecuredDataSource {
    login(credentials: JSONObject): Promise<boolean>;
    logout(): Promise<boolean>;
}

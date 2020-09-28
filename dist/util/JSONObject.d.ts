export declare type JSONObject = null | boolean | number | string | JSONObject[] | {
    [prop: string]: JSONObject;
};
export declare type JsonCompatible<T> = {
    [P in keyof T]: T[P] extends JSONObject ? T[P] : Pick<T, P> extends Required<Pick<T, P>> ? never : T[P] extends (() => any) | undefined ? never : JsonCompatible<T[P]>;
};

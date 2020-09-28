// https://github.com/microsoft/TypeScript/issues/1897#issuecomment-580962081

export type JSONObject =
    | null
    | boolean
    | number
    | string
    | JSONObject[]
    | { [prop: string]: JSONObject };

export type JsonCompatible<T> = {
    [P in keyof T]: T[P] extends JSONObject
        ? T[P]
        : Pick<T, P> extends Required<Pick<T, P>>
            ? never
            : T[P] extends (() => any) | undefined
                ? never
                : JsonCompatible<T[P]>;
};
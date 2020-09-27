/**
 * Utility class containing auxiliary methods.
 */
class DataSourceUtil {
    /**
     * Check if a given object is an array of KVPs.
     *
     * @param object
     * @return true if object is an array of KVPs, false otherwise
     */
    public static isArrayOfKVPs(object: any): boolean {
        if (this.isArray(object)) {
            for (let i in object) {
                if (!this.isKVP(i)) {
                    return false;
                }
            }
            return true;
        } else {
            return false;
        }
    }

    /**
     * Check if a given object contains Key-Value-Pairs.
     *
     * @param object
     * @return true if object is a set of KVP, false otherwise
     */
    public static isKVP(object: any): boolean {
        return Object.keys(object).length > 0;
    }

    /**
     * Check if a given object is an array.
     *
     * @param object
     * @return true if object is an array, false otherwise
     */
    public static isArray(object: any): boolean {
        return Array.isArray(object);
    }

    /**
     * Check if a given object is a string.
     *
     * @param object
     * @return true if object is a string, false otherwise
     */
    public static isString(object: any): boolean {
        return typeof object === "string";
    }

    /**
     * Check if a given object is a number.
     *
     * @param object
     * @return true if object is a number, false otherwise
     */
    public static isNumber(object: any): boolean {
        return typeof object === "number";
    }

    /**
     * Check if a given object is a boolean.
     *
     * @param object
     * @return true if object is a boolean, false otherwise
     */
    public static isBoolean(object: any): boolean {
        return typeof object === "boolean";
    }
}
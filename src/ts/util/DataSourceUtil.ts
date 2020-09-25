/**
 * Utility class containing auxiliary methods.
 */
class DataSourceUtil {
    /**
     * Initializes an attribute of an object.
     * If this attribute in options does not exist or its value is undefined,
     * then a default value shall be assigned instead.
     *
     * @param object an object the attribute belongs to
     * @param attributeName the name of the attribute to be initialized
     * @param attributeValue the value that should be assigned to the existing attribute
     * @param defaultValue the default value that shall be assigned if this attribute does not exist
     */
    public static initAttribute(object: any, attributeName: string, attributeValue: any, defaultValue: any) {
        if (attributeValue == null) {
            object[attributeName] = defaultValue;
        } else {
            object[attributeName] = attributeValue;
        }
    }

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
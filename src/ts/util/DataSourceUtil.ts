/**
 * Utility class containing auxiliary methods.
 */
class DataSourceUtil {
    /**
     * Converts a FetchResultSet object, which is an array of KVPs to one single KVP depending on the data structure type.
     *
     * @param fetchResultSet the response received from the data source provider
     * @param dataStructureType the data structure type of the response
     */
    public static convertFetchResultSetToKVPs(fetchResultSet: FetchResultSet, dataStructureType: DataStructureType): KVP {
        let kvpResult: KVP = {};
        if (dataStructureType === DataStructureType.HORIZONTAL) {
            // FetchResultSet is then an array of one row, the first column contains ID
            let row = fetchResultSet.data[0];
            let count = 0;
            for (let k in Object.keys(row)) {
                if (count++ === 0) {
                    continue;
                }
                kvpResult[k] = row[k];
            }
        } else {
            // FetchResultSet is then an array of multiple rows,
            // each row contains only 3 columns: ID, attribute name and attribute value
            for (var i = 0; i < fetchResultSet.data.length; i++) {
                let row = fetchResultSet.data[i];
                let keys = Object.keys(row);
                let attributeName = row[keys[1]];
                let attributeValue = row[keys[2]];
                kvpResult[attributeName] = attributeValue;
            }
        }
        return kvpResult;
    }

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
class Util {
    /**
     * Initializes an attribute of an object.
     * If this attribute does not exist or its value is undefined,
     * then a default value shall be assigned instead.
     *
     * @param object an object the attribute belongs to
     * @param attributeName the name of the attribute to be initialized
     * @param attributeValue the value that should be assigned to the existing attribute
     * @param defaultValue the default value that shall be assigned if this attribute does not exist
     */
    public static initAttribute(object: any, attributeName: string, attributeValue: any, defaultValue: any) {
        if (object[attributeName] == null) {
            object[attributeName] = defaultValue;
        } else {
            object[attributeName] = attributeValue;
        }
    }
}
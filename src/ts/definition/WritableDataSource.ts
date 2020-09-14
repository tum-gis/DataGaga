/**
 * Declares write functionalities of a data source.
 */
interface WritableDataSource {
    /**
     * Updates an attribute value of a given ID.
     *
     * @param id
     * @param attributeName
     * @param newValue
     * @return a promise boolean value, true if the change has been successfully executed, otherwise false
     */
    updateAttributeValueOfId(id: string, attributeName: string, newValue: any): Promise<boolean>;

    /**
     * Updates attributes of objects in the data source filtered in the Query-By-Example expression.
     *
     * Example: Set stories to 2 and area to 1000 of all objects with height >= 10.
     * qbe = {
     *      attributeName: height,
     *      comparisonOperator: GEQ,
     *      value: 10
     * },
     * newAttributeValues = {
     *     stories = 2,
     *     area = 1000
     * }
     *
     * @param qbe
     * @param newAttributeValues
     * @return a promise boolean value, true if the change has been successfully executed, otherwise false
     */
    updateAttributeValuesUsingQBE(qbe: QBE, newAttributeValues: KVP): Promise<boolean>;

    /**
     * Inserts a new attribute to an existing ID.
     *
     * @param id
     * @param attributeName
     * @param attributeValue
     * @return a promise boolean value, true if the change has been successfully executed, otherwise false
     */
    insertAttributeOfId(id: string, attributeName: string, attributeValue: any): Promise<boolean>;

    /**
     * Inserts new attributes to the objects in the data source filterd by the Query-By-Example expression.
     *
     * Example: Insert attributes stories = 2 and area = 1000 to all objects with height >= 10.
     * qbe = {
     *      attributeName: height,
     *      comparisonOperator: GEQ,
     *      value: 10
     * },
     * newAttributes = {
     *     stories = 2,
     *     area = 1000
     * }
     *
     * @param qbe
     * @param newAttributes
     * @return a promise boolean value, true if the change has been successfully executed, otherwise false
     */
    insertAttributesUsingQBE(qbe: QBE, newAttributes: KVP): Promise<boolean>;

    /**
     * Inserts a new object/row to the data source.
     *
     * @param kvp a Key-Value-Pair object containing the data to be inserted
     * @return a promise boolean value, true if the change has been successfully executed, otherwise false
     */
    insertNewObject(kvp: KVP): Promise<boolean>;

    /**
     * Deletes an object of a given ID from the data source.
     *
     * @param id
     * @return a promise boolean value, true if the change has been successfully executed, otherwise false
     */
    deleteObjectOfId(id: string): Promise<boolean>;

    /**
     * Deletes an attribute from an object of a given ID.
     *
     * @param id
     * @param attributeName
     * @return a promise boolean value, true if the change has been successfully executed, otherwise false
     */
    deleteAttributeOfId(id: string, attributeName: string): Promise<boolean>;

    /**
     * Deletes attributes from the objects in the data source filtered by the Query-By-Example expression.
     *
     * Example: Delete attributes stories and heights from objects in the data source that have height >= 10.
     * qbe = {
     *      attributeName: height,
     *      comparisonOperator: GEQ,
     *      value: 10
     * },
     * attributeNames = {
     *     stories,
     *     area
     * }
     *
     * @param qbe
     * @param attributeNames
     * @return a promise boolean value, true if the change has been successfully executed, otherwise false
     */
    deleteAttributesUsingQBE(qbe: QBE, attributeNames: string[]): Promise<boolean>;

    /**
     * Deletes objects from the data source filtered by the Query-By-Example expression.
     *
     * Example: Delete all objects from the data source that have height >= 10.
     * qbe = {
     *      attributeName: height,
     *      comparisonOperator: GEQ,
     *      value: 10
     * }
     *
     * @param qbe
     * @return a promise boolean value, true if the change has been successfully executed, otherwise false
     */
    deleteObjectsUsingQBE(qbe: QBE): Promise<boolean>;
}

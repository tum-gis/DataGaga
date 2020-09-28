export const enum DataStructureType {
    /**
     * Table structure type where all attributes of an object are stored in one row.
     * Can only store objects with fixed number of attributes.
     */
    HORIZONTAL = "Horizontal",

    /**
     * Table structure type where each attribute of an object is stored in one row.
     * Can stored objects with variable number of attributes.
     */
    VERTICAL = "Vertical"
}
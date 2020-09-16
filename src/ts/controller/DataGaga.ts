/**
 * A list of all data source types.
 * Note: The entries in this list must be the same as the class names!
 */
enum DataSourceType {
    GoogleSheets = "GoogleSheets",
    PostgreSQL = "PostgreSQL",
    KML = "KML"
}

/**
 * A utility class for manipulating data sources on the client side
 */
class DataGaga {
    /**
     * Instantiate a data source of type based on a given string or DataSourceType object.
     *
     * @param dataSourceType the type of the data source to be created, must be the same as the class names
     * @param options
     */
    public static createDataSource(dataSourceType: string | DataSourceType, options: any): DataSource {
        if (dataSourceType != null) {
            var newInstance = Object.create(window[dataSourceType].prototype);
            newInstance.constructor.apply(newInstance, [options]);
            return newInstance;
        }
        return undefined;
    }
}
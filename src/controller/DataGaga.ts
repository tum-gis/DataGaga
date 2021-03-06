import {MashupDataSource} from "../core/MashupDataSource";
import {GoogleSheets} from "../application/GoogleSheets";
import {PostgreSQL} from "../application/PostgreSQL";
import {DataSource} from "../core/DataSource";
import {KML} from "../application/KML";

/**
 * A list of all data source types.
 * Note: The entries in this list must be the same as the class names!
 */
export const enum DataSourceType {
    Mashup = "Mashup",
    GoogleSheets = "GoogleSheets",
    PostgreSQL = "PostgreSQL",
    KML = "KML"
}

/**
 * A utility class for manipulating data sources on the client side
 */
export class DataGaga {
    /**
     * Instantiate a data source of type based on a given string or DataSourceType object.
     *
     * @param dataSourceType the type of the data source to be created, must be the same as the class names
     * @param options
     * @param addToMashup whether the created data source should be added to the mashup one
     */
    public static createDataSource(dataSourceType: string | DataSourceType, options: any): DataSource {
        /*
        if (dataSourceType != null) {
            var newInstance = Object.create(window[dataSourceType].prototype);
            newInstance.constructor.apply(newInstance, [options]);
            return newInstance;
        }
        */
        if (dataSourceType != null) {
            switch (dataSourceType) {
                case DataSourceType.Mashup:
                    return new MashupDataSource(options);
                case DataSourceType.GoogleSheets:
                    return new GoogleSheets(options);
                case DataSourceType.PostgreSQL:
                    return new PostgreSQL(options);
                case DataSourceType.KML:
                    return new KML(options);
                default:
                    throw new Error("Invalid data source type. Entered value: " + dataSourceType + ".");
            }
        } else {
            throw new Error("Empty data source type entered.");
        }
    }
}
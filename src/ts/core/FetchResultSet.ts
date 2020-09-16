/**
 * Stores responses from the data sources for further use.
 */
class FetchResultSet {
    /**
     * Stores results fetched from the data source.
     * Example:
     * [
     *      {gmlid: 1, height: 20, nrOfStories: 3},
     *      {gmlid: 2, height: 10, nrOfStories: 1}
     * ]
     *
     * @private
     */
    private _data: Array<KVP>;

    /**
     * Instantiate a FetchResultSet object from given data.
     *
     * @param data
     */
    constructor(data: any) {
        let tmpData = data;
        // Convert to JSON in case of string
        if (DataSourceUtil.isString(data)) {
            data = JSON.parse(data);
        }
        // Structure of given data must be an array of KVPs
        if (DataSourceUtil.isArrayOfKVPs(data)) {
            this._data = data;
        } else {
            this._data = undefined;
        }
    }

    /**
     * Adds a KVP object at the end of this array.
     *
     * @param kvp
     */
    public push(kvp: KVP): void {
        this._data.push(kvp);
    }

    /**
     * Removes a KVP object at a given index.
     *
     * @param index
     */
    public remove(index: number): void {
        this._data.splice(index, 1);
    }

    /**
     * Converts this FetchResultSet object, which is an array of KVPs, to one single KVP depending on the data structure type.
     *
     * @param fetchResultSet the response received from the data source provider
     * @param dataStructureType the data structure type of the response
     */
    public toKVP(dataStructureType: DataStructureType): KVP {
        let kvpResult: KVP = {};
        if (dataStructureType == DataStructureType.HORIZONTAL) {
            // FetchResultSet is then an array of one row, the first column contains ID
            let row = this.data[0];
            let count = 0;
            for (let k in row) {
                if (count++ === 0) {
                    continue;
                }
                kvpResult[k] = row[k];
            }
        } else {
            // FetchResultSet is then an array of multiple rows,
            // each row contains only 3 columns: ID, attribute name and attribute value
            for (var i = 0; i < this.data.length; i++) {
                let row = this.data[i];
                let keys = Object.keys(row);
                let attributeName = row[keys[1]];
                let attributeValue = row[keys[2]];
                kvpResult[attributeName] = attributeValue;
            }
        }
        return kvpResult;
    }

    public getNrOfRows(): number {
        return this._data.length;
    }

    /**
     * Calculates the number of entries stored in this data.
     * For a data in rectangular form, this will be number of rows times number of columns.
     * For a data with irregular number of columns,
     * this shall be calculated by summing up the length of individual rows.
     *
     * @return the total number of entries stored in this data
     */
    public getNrOfEntries(): number {
        let result = 0;
        for (let row in this._data) {
            result += Object.keys(row).length;
        }
        return result;
    }

    /**
     * Checks if the fetched result is rectangular,
     * which means whether all rows have the same number of columns.
     *
     * @return true if the fetched result is rectangular/tabular, false otherwise
     */
    public isRectangular(): boolean {
        if (this.getNrOfRows() === 0) {
            return true;
        }
        let nrOfCols = Object.keys(this._data[0]).length;
        for (var i = 1; i < this.getNrOfRows(); i++) {
            if (Object.keys(this._data[i]).length !== nrOfCols) {
                return false;
            }
        }
        return true;
    }

    /**
     * Gives all column names. Only works for data in rectangular form.
     *
     * @return an array of column names, empty if not rectangular or the data is empty
     */
    public getColumnNames(): string[] {
        if (!this.isRectangular()) {
            return [];
        }

        if (this.getNrOfRows() === 0) {
            return [];
        }

        return Object.keys(this._data[0]);
    }

    get data(): Array<KVP> {
        return this._data;
    }

    set data(value: Array<KVP>) {
        this._data = value;
    }
}

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
        if (Util.isString(data)) {
            data = JSON.parse(data);
        }
        // Structure of given data must be an array of KVPs
        if (Util.isArrayOfKVPs(data)) {
            this._data = data;
        } else {
            this._data = undefined;
        }
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

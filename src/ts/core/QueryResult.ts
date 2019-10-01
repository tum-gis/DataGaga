class QueryResult {
    private _data: {};

    constructor(data: {}) {
        this._data = data;
    }

    public getSize(): number {
        let size = 0;
        let key;

        for (let key in this._data) {
            if (this._data.hasOwnProperty(key)) {
                size++;
            }
        }

        return size;
    }

    get data(): {} {
        return this._data;
    }

    set data(value: {}) {
        this._data = value;
    }

}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MashupDataSource = void 0;
const FetchResultSet_1 = require("./FetchResultSet");
const DataSource_1 = require("./DataSource");
class MashupDataSource extends DataSource_1.DataSource {
    constructor(options, mashup) {
        super(options);
        if (mashup != null) {
            this._mashup = mashup;
        }
        else {
            this._mashup = [];
        }
    }
    static fromObject(otherMashupDataSource) {
        if (otherMashupDataSource == null) {
            return otherMashupDataSource;
        }
        let options = {
            name: otherMashupDataSource.name,
            dataSourceType: otherMashupDataSource.dataSourceType,
            capabilities: otherMashupDataSource.capabilities
        };
        let mashupDataSource = new MashupDataSource(options);
        return Object.assign(mashupDataSource, otherMashupDataSource);
    }
    addDataSource(dataSource) {
        if (dataSource != null) {
            this._mashup.push(dataSource);
        }
    }
    removeDataSource(index) {
        if (index != null && index >= 0 && index < this._mashup.length) {
            this._mashup.splice(index, 1);
        }
    }
    size() {
        return this._mashup.length;
    }
    get(index) {
        return this._mashup[index];
    }
    get mashup() {
        return this._mashup;
    }
    set mashup(value) {
        this._mashup = value;
    }
    aggregateByIds(ids, aggregateOperator, attributeName) {
        throw new Error("Method not implemented.");
    }
    fetchAttributeNamesFromId(id) {
        throw new Error("Method not implemented.");
    }
    fetchAttributeValuesFromId(id) {
        let scope = this;
        let result = new FetchResultSet_1.FetchResultSet([]);
        let promises = new Array();
        for (let datasource of scope._mashup) {
            if (typeof datasource.hasOwnProperty("fetchAttributeValuesFromId")) {
                promises.push(datasource.fetchAttributeValuesFromId(id));
            }
        }
        return new Promise(function (resolve, reject) {
            Promise.all(promises).then(function (fetchResultSets) {
                for (let fetchResultSet of fetchResultSets) {
                    result.concat(fetchResultSet);
                }
                if (result.size() >= 0) {
                    resolve(result);
                }
                else {
                    reject("Could not fetch for this mashup.");
                }
            }).catch(function (error) {
                reject(error);
            });
        });
    }
    fetchIdsFromQBE(qbe, limit) {
        throw new Error("Method not implemented.");
    }
    fetchIdsFromQBEs(qbes, limit) {
        throw new Error("Method not implemented.");
    }
    getMetaData() {
        throw new Error("Method not implemented.");
    }
}
exports.MashupDataSource = MashupDataSource;

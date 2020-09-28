import { KVP } from "../util/KVP";
import { DataStructureType } from "../util/DataStructureType";
export declare class FetchResultSet {
    private _data;
    constructor(data: any);
    concat(otherFetchResultSet: FetchResultSet): void;
    push(kvp: KVP): void;
    remove(index: number): void;
    toKVP(dataStructureType: DataStructureType): KVP;
    getNrOfRows(): number;
    size(): number;
    getNrOfEntries(): number;
    isRectangular(): boolean;
    getColumnNames(): string[];
    toString(): string;
    get data(): Array<KVP>;
    set data(value: Array<KVP>);
}

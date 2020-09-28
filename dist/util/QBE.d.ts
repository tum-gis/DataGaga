import { ComparisonOperator } from "./ComparisonOperator";
import { KVP } from "./KVP";
export declare class QBE {
    private _attributeName;
    private _comparisonOperator;
    private _value;
    constructor(attributeName: string, comparisonOperator: ComparisonOperator, value: string);
    assert(value: string | null, caseSensitive?: boolean): boolean;
    toKVP(): KVP;
    toString(): string;
    get attributeName(): string;
    set attributeName(value: string);
    get comparisonOperator(): ComparisonOperator;
    set comparisonOperator(value: ComparisonOperator);
    get value(): string;
    set value(value: string);
}

import {ComparisonOperator} from "./ComparisonOperator";
import {KVP} from "./KVP";

/**
 * Represents Query By Example (QBE) expressions.
 * Each QBE expression consists of three components:
 *
 * 1. Attribute name
 * 2. Comparion Operator
 * 3. Value
 *
 * Example:
 * {
 *     attributeName: height,
 *     comparisonOperator: GEQ,
 *     value: 10
 * }
 * indicates all height values greater than or equal to 10.
 */
export class QBE {
    private _attributeName: string;
    private _comparisonOperator: ComparisonOperator;
    private _value: string;

    constructor(attributeName: string, comparisonOperator: ComparisonOperator, value: string) {
        this._attributeName = attributeName;
        this._comparisonOperator = comparisonOperator;
        this._value = value;
    }

    /**
     * Compares a given value with the value defined in this QBE expression.
     * If both values are numeric, numeric comparisons are applied.
     * Otherwise lexicographical text comparisons shall be used (with or without case sensitivity).
     *
     * @param value
     * @param caseSensitive (optional) boolean, only need for text comparisons
     * @return true if the given value satisfies the QBE expression compared to the reference value, false otherwise
     */
    public assert(value: string | null, caseSensitive?: boolean): boolean {
        if (value == null) {
            return false;
        }
        // check is numeric
        let otherNumValue = Number(value);
        let thisNumValue = Number(this._value)
        if (!isNaN(thisNumValue) && !isNaN(otherNumValue)) {
            switch (this._comparisonOperator) {
                case ComparisonOperator.EQ:
                    return otherNumValue == thisNumValue;
                case ComparisonOperator.NEQ:
                    // NEQ check must appear before GT, GEQ, LT and LEQ, since these are also NEQ
                    return otherNumValue != thisNumValue;
                case ComparisonOperator.GT:
                    return otherNumValue > thisNumValue;
                case ComparisonOperator.GEQ:
                    return otherNumValue >= thisNumValue;
                case ComparisonOperator.LT:
                    return otherNumValue < thisNumValue;
                case ComparisonOperator.LEQ:
                    return otherNumValue <= thisNumValue;
                default:
                    return false;
            }
        } else {
            let otherTextValue = value;
            let thisTextValue = this._value;
            if (caseSensitive != null && caseSensitive) {
                otherTextValue = value.toLowerCase();
                thisTextValue = this._value.toLowerCase();
            }
            switch (this._comparisonOperator) {
                case ComparisonOperator.EQ:
                    return otherTextValue.localeCompare(thisTextValue) === 0;
                case ComparisonOperator.NEQ:
                    // NEQ check must appear before GT, GEQ, LT and LEQ, since these are also NEQ
                    return otherTextValue.localeCompare(thisTextValue) !== 0;
                case ComparisonOperator.GT:
                    return otherTextValue.localeCompare(thisTextValue) > 0;
                case ComparisonOperator.GEQ:
                    return otherTextValue.localeCompare(thisTextValue) >= 0;
                case ComparisonOperator.LT:
                    return otherTextValue.localeCompare(thisTextValue) < 0;
                case ComparisonOperator.LEQ:
                    return otherTextValue.localeCompare(thisTextValue) <= 0;
                default:
                    return false;
            }
        }
    }

    /**
     * Converts this QBE expression to a JSON object (triple KVP).
     *
     * @return a JSON object, which is also a KVP containing 3 key-value-pairs
     */
    public toKVP(): KVP {
        let result: KVP = {};
        result["attributeName"] = this._attributeName;
        result["comparisonOperator"] = this._comparisonOperator;
        result["value"] = this._value;
        return result;
    }

    public toString(): string {
        return this.toKVP().toString();
    }

    public get attributeName(): string {
        return this._attributeName;
    }

    public set attributeName(value: string) {
        this._attributeName = value;
    }

    public get comparisonOperator(): ComparisonOperator {
        return this._comparisonOperator;
    }

    public set comparisonOperator(value: ComparisonOperator) {
        this._comparisonOperator = value;
    }

    public get value(): string {
        return this._value;
    }

    public set value(value: string) {
        this._value = value;
    }
}

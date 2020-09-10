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
interface QBE {
    attributeName: string,
    comparisonOperator: ComparisonOperator,
    value: string
}

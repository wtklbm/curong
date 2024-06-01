/**
 * 是不是一个 `Infinity`，即正无穷大的数
 *
 * `Infinity` 等价于  `Number.POSITIVE_INFINITY`，是超出 `1.7976931348623157E+103088` 的数。
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @note
 *
 * - `Number.POSITIVE_INFINITY` 是一个不可写、不可枚举、不可配置的值
 *
 * ### 与数学上的无穷大的区别
 *
 * - 任何正值，包括 [`POSITIVE_INFINITY`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY)，乘以 `POSITIVE_INFINITY` 等于 `POSITIVE_INFINITY`
 * - 任何负值，包括 [`NEGATIVE_INFINITY`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/NEGATIVE_INFINITY)，除以 `POSITIVE_INFINITY` 等于 `NEGATIVE_INFINITY`
 * - 任何正数除以 `POSITIVE_INFINITY` 都是[正零](https://zh.wikipedia.org/wiki/0) (正如 [IEEE 754](https://zh.wikipedia.org/wiki/IEEE_754) 中所定义的)
 * - 任何负数除以 `POSITIVE_INFINITY` 都是[负零](https://zh.wikipedia.org/wiki/-0) (正如 IEEE 754 中所定义的)
 * - 零乘以 `POSITIVE_INFINITY` 等于 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)
 * - `NaN` 乘以 `POSITIVE_INFINITY` 等于 `NaN`
 * - `POSITIVE_INFINITY`，除以任何正值 (除了 `POSITIVE_INFINITY`)都等于 `POSITIVE_INFINITY`
 * - `POSITIVE_INFINITY`，除以任何负值 (除了 `NEGATIVE_INFINITY`)都等于 `NEGATIVE_INFINITY`
 * - `POSITIVE_INFINITY`，除以 `NEGATIVE_INFINITY` 或 `POSITIVE_INFINITY`，都等于 `NaN`
 * - `Number.POSITIVE_INFINITY > x` 对于任何不是 `POSITIVE_INFINITY` 的数字 x 都为真
 */
export default function isInfinityPositive(value: unknown): value is number {
    return value === Infinity;
}

import isNumberPrimitive from './isNumberPrimitive';
import isNumberObject from './isNumberObject';

/**
 * 是不是一个数字或被包装后的数字对象
 *
 * @info 包含以下的值：
 * - `NaN` 不是数字的值，`NaN` 不等于任何值，包括其自身
 * - `Infinity` 无穷大
 * - `Number.POSITIVE_INFINITY` 正无穷大
 * - `Number.NEGATIVE_INFINITY` 负无穷大
 * - `Number.MAX_VALUE` 最大值，`MAX_VALUE` 属性值接近于 `1.79E+308`。大于 `MAX_VALUE` 的值代表 `Infinity`。
 *      因为精度原因，`MAX_VALUE + 1` 并不等于 `Infinity`。
 * - `Number.MIN_VALUE` 最小整数值，`MIN_VALUE` 属性是最接近 `0` 的正值，而不是最小的负值。
 *      `MIN_VALUE` 的值约为` 5e-324`。小于` MIN_VALUE ("underflow values")` 的值将会转换为 `0`。
 * - `Number.MAX_SAFE_INTEGER` 最大安全范围的值
 * - `Number.MIN_SAFE_INTEGER` 最小安全范围的值
 * - `Number.EPSILON`  1 与大于 1 的最小值之间的差
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isNumber(value: unknown): value is number {
    return isNumberPrimitive(value) || isNumberObject(value);
}

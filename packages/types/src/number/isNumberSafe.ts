import isFinite from './isFinite';

/**
 * 是不是一个可以安全计算的数字
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @note
 *
 * - 该方法是 {@link Number.isFinite} 的别名，也应该是 {@link Number} 系列的常用方法
 * - 一个能够在 `JavaScript` 中正确表示的数字就是一个可以安全计算的数字
 * - 如果想知道是否为安全的整数，请使用 `isIntSafe` 方法
 *
 * 要求：
 *  - 不能是 `Infinity`、`-Infinity` 或 `NaN`
 *  - 必须是 `JavaScript` 中能表示的数字，即 `Number.MAX_VALUE ~ -Number.MAX_VALUE` (`1.7976931348623157e308 ~ -1.7976931348623157e308`)
 *   需要注意的是：`Number.MIN_VALUE` 是一个最小正数，是一个大于 `0` 的数
 *
 * 一个数值可以容纳的最大值是 `2^1024- 1` (指数为 `1023`，尾数为基于二进制的 `0.1111…`)，可以通过 [`Number.MAX_VALUE`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_VALUE) 获得。超过这个值的数会被替换为特殊的数值常量 [`Infinity`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Infinity)。
 */
export default function isNumberSafe(value: unknown): value is number {
    return isFinite(value);
}

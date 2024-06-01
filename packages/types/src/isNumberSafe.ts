import isFinite from './isFinite';

/**
 * 是不是一个可以安全计算的数字
 *
 * - 该方法是 {@link Number.isFinite} 的别名，也应该是 {@link Number} 系列的常用方法
 * - 一个能够在 `JavaScript` 中正确表示的数字就是一个可以安全计算的数字
 * - 如果想知道是否为安全的整数，请使用 `isIntSafe` 方法
 *
 * @param value 要验证的值
 *  - 不能是 `Infinity`、`-Infinity` 或 `NaN`
 *  - 必须是 `JavaScript` 中能表示的数字，即 `Number.MAX_VALUE ~ -Number.MAX_VALUE` (`1.7976931348623157e+308 ~ -1.7976931348623157e+308`)
 *  - 需要注意的是：`Number.MIN_VALUE` 是一个最小正数，是一个大于 0 的数
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isNumberSafe(value: unknown): value is number {
    return isFinite(value);
}

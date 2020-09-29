/**
 * 是不是一个安全的整数
 *
 * @info 包含正整数和负整数，并且只能是安全的整数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 *
 * ###  一个安全整数是一个符合下面条件的整数
 *
 * - 可以准确地表示为一个 `IEEE-754` 双精度数字
 * - 其 `IEEE-754` 表示不能是舍入任何其他整数以适应 `IEEE-754` 表示的结果
 *
 * 比如，`2^53 - 1` 是一个安全整数，它能被精确表示，在任何 `IEEE-754` 舍入模式下，没有其他整数舍入结果为该整数。
 * 作为对比，`2^53` 就不是一个安全整数，它能够使用 `IEEE-754` 表示，但是 `2^53 + 1` 不能使用 `IEEE-754` 直接表示，在就近舍入和向零舍入中，会被舍入为 `2^53`。
 *
 * 安全整数范围为 `-2^53 - 1`(包含) 到 `2^53 - 1`(包含) 之间的整数。
 *
 *
 * ### polyfill
 *
 * ``` javascript
 * Number.isSafeInteger = Number.isSafeInteger || function (value) {
 *    return Number.isInteger(value) && Math.abs(value) <= Number.MAX_SAFE_INTEGER;
 * };
 * ```
 */
export default function isIntSafe(value: any): value is number {
    return Number.isSafeInteger(value);
}

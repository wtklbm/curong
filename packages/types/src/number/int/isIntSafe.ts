/**
 * 是不是一个安全的整数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @note
 *
 * - 该方法是 {@link Number.isSafeInteger} 的别名
 * - 包含正整数和负整数，并且只能是安全的整数
 * - 超过安全整数的运算是不安全的，如果要表示其他整数，请考虑使用 {@link BigInt}
 * - 如果想知道是不是一个 `JavaScript` 可以表示的数字，请使用 `isNumberSafe` ({@link Number.isFinite} 方法的别名)
 *
 * ### 一个安全整数是一个符合下面条件的整数
 *
 * - 可以准确地表示为一个 `IEEE-754` 双精度数字
 * - 其 `IEEE-754` 表示不能是舍入任何其他整数以适应 `IEEE-754` 表示的结果
 *
 * 比如，`2^53-1` 是一个安全整数，它能被精确表示，在任何 `IEEE-754` 舍入模式下，没有其他整数舍入结果为该整数。
 * 作为对比，`2^53` 就不是一个安全整数，它能够使用 `IEEE-754` 表示，但是 `2^53+1` 不能使用 `IEEE-754` 直接表示，在就近舍入和向零舍入中，会被舍入为 `2^53`。
 *
 * 安全整数范围为 `-2^53-1`(包含) 到 `2^53-1`(包含) 之间的整数。
 *
 * 只有在 `-2^53 + 1` 到 `2^53 - 1` 范围内的整数才能在不丢失精度的情况下被表示 (可通过 [`Number.MIN_SAFE_INTEGER`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER) 和 [`Number.MAX_SAFE_INTEGER`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) 获得)，因为尾数只能容纳 53 位 (包括前导 1)。
 *
 * ### 在项目中，应该使用此方法来规避精度丢失问题
 *
 *  - 在 Java 中 Long 类型的取值范围是 `-2^63-1` (`-9223372036854776000`) 到 `2^63-1` (`9223372036854776000`)
 *  - 在 JavaScript 中，Number 类型范围 `-2^53-1` (`-9007199254740991`) 到 `2^53-1` (`9007199254740991`)
 *
 * #### 使用 `BigInt`
 *
 * ```javascript
 * const max = BigInt(Number.MAX_SAFE_INTEGER);
 * console.log(max + 1n, max + BigInt(1)); // 9007199254740992n
 * ```
 *
 * #### 把数字转换为字符串
 *
 * ```javascript
 * import JSONbig from 'json-bigint';
 *
 * axios({
 *     method,
 *     url,
 *     data,
 *     // 配置 `transformResponse`，转换响应体中的内容
 *     transformResponse: [
 *         // `parse` 方法会把超出 JS 安全整数范围的数字转为一个 `BigNumber` 类型的对象
 *         data => JSONbig({ storeAsString: true }).parse(data)
 *     ]
 * });
 * ```
 *
 * ### polyfill
 *
 * ``` javascript
 * Number.isSafeInteger = Number.isSafeInteger || function (value) {
 *    return Number.isInteger(value) && Math.abs(value) <= Number.MAX_SAFE_INTEGER;
 * };
 * ```
 */
export default function isIntSafe(value: unknown): value is number {
    return Number.isSafeInteger(value);
}

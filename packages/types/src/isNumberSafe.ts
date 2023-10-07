import isNumber from './isNumber';

/**
 * 是不是一个安全的数字，该数字不能为 `NaN`，并且介于 `MAX_VALUE` 和 `-MAX_VALUE` 之间
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 *
 * ### 在项目中，应该使用此方法来规避精度丢失问题
 *
 *  - 在 Java 中 Long 类型的取值范围是 `-2^63-1` (-9223372036854776000) 到 `2^63-1` (9223372036854776000)。
 *  - 在 JavaScript 中，Number 类型范围 `-2^53+1` (-9007199254740991) 到 `2^53-1` (9007199254740991)。
 *
 * #### 使用 `BigInt`
 *
 *
 * ```javascript
 * const max = BigInt(Number.MAX_SAFE_INTEGER);
 * console.log(max + 1n, max + BigInt(1)); // 9007199254740992n
 * ```
 *
 * #### 把数字转换为字符串
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
 */
export default function isNumberSafe(value: unknown): value is number {
    return (
        isNumber(value) &&
        !Number.isNaN(value) &&
        value <= Number.MAX_VALUE &&
        value >= -Number.MAX_VALUE
    );
}

import isUndefined from '../nullable/isUndefined';
import isString from '../string/isString';

import isInfinity from './isInfinity';
import isNumber from './isNumber';

export type IsNumberValidOptions = {
    /**
     * 在进行数字转换时，是否可以进行隐式转换。默认为 `true`。
     * 如果允许隐式转换，则布尔值、空字符串 (包括多个空格字符的字符串)、空数组、`null`、`BigInt`、`NaN` 等均可以转换为数字。
     * 否则，则只判断数字 (非 `BigInt`) 和数字字符串是否可以转换为有效的数字。
     */
    implicit?: boolean;

    /** 当转换后为 `NaN` 时，是否返回 `true`。默认为 `false` */
    allowNaN?: boolean;

    /** 当转换后为 `Infinity` 或 `-Infinity` 时，是否返回 `true`。默认为 `false` */
    allowInfinity?: boolean;

    /** 当转换且经过 `trim` 后长度为 `0` 的空字符串时，是否返回 `true`。默认为 `false` */
    allowEmptyString?: boolean;
};

/**
 * 是不是一个可以转换为有效的数字的值
 *
 * @param value 要验证的值
 * @param options 配置选项
 *  - `implicit`: 在进行数字转换时，是否可以进行隐式转换。默认为 `true`
 *  - `allowNaN`: 当转换后为 `NaN` 时，是否返回 `true`。默认为 `false`
 *  - `allowInfinity`: 当转换后为 `Infinity` 或 `-Infinity` 时，是否返回 `true`。默认为 `false`
 *  - `allowEmptyString`: 当转换且经过 `trim` 后长度为 `0` 的空字符串时，是否返回 `true`。默认为 `false`
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 *
 * ```typescript
 * isNumberValid(''); // true
 * isNumberValid(' '); // true
 * isNumberValid(' ', { implicit: false }); // false
 * isNumberValid(' ', { allowNaN: true }); // true
 * ```
 *
 * @note
 *
 * ### 哪些类型可以隐式转换为数字
 *
 * - 字符串
 *  - 可转换的字符串: 字符串如果是有效的数字表示（例如 "123"、"3.14"），则可以转换为相应的数字
 *  - 不可转换的字符串: 如果字符串无法转换为有效数字（例如 "abc"），则转换结果为 NaN
 * - 布尔值: `true` 转换为 1，`false` 转换为 0
 * - `null`: 转换为 0
 * - `undefined`: 转换为 NaN
 * - `Infinity`: 转换为 Infinity
 * - `-Infinity`: 转换为 -Infinity
 * - 数组
 *  - 数组在转换为数字时，会调用其 `toString()` 方法，返回的字符串会被转换为数字
 *  - 如果数组为空，转换结果为 0；如果数组包含有效数字字符串，则会转换为相应的数字
 * - 对象
 *  - 对象在转换为数字时，会首先调用其 `valueOf()` 方法，如果返回的值是原始类型，则会进行转换；如果返回的是对象，则会调用 `toString()` 方法进行转换
 *  - 如果对象的 `valueOf()` 或 `toString()` 方法返回的是有效的数字字符串，则可以成功转换为数字
 *
 * ```typescript
 * const obj1 = {
 *     valueOf: function() {
 *         return 42;
 *     }
 * };
 *
 * const obj2 = {
 *     toString: function() {
 *         return "3.14";
 *     }
 * };
 *
 * console.log(Number(obj1)); // 42
 * console.log(Number(obj2)); // 3.14
 * ```
 */
export default function isNumberValid(
    value: unknown,
    options: IsNumberValidOptions = {}
): boolean {
    const {
        implicit = true,
        allowNaN = false,
        allowInfinity = false,
        allowEmptyString = false
    } = options;

    return (
        (implicit
            ? !isUndefined(value)
            : isNumber(value, allowNaN) ||
              (isString(value) && (allowEmptyString || value.trim() !== ''))) &&
        (allowNaN || !isNaN(Number(value).valueOf())) &&
        (allowInfinity || !isInfinity(Number(value).valueOf()))
    );
}

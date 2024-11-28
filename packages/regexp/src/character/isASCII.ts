/**
 * 是不是一个 ASCII 字符串
 *
 * @param value 要判断的值
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 * ```typescript
 * console.log(isASCII('a')); // true
 * console.log(isASCII('A')); // true
 * console.log(isASCII('\r\n')); // true
 * ```
 * @note
 *  - ASCII 代码点的范围为 `0-127`
 */
export default function isASCII(value: string): boolean {
    return Array.from(value).every(v => v.charCodeAt(0) <= 127);
}

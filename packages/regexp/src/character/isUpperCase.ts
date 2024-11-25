const regex = /^[A-Z]+$/;

/**
 * 是不是一个由 `A-Z` 组成的大写字母字符串
 *
 * @param value 要判断的值
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 * ```typescript
 * console.log(isUpperCase('A')); // true
 * console.log(isUpperCase('a')); // false
 * console.log(isUpperCase('Z')); // true
 * console.log(isUpperCase('z')); // false
 * console.log(isUpperCase('1')); // false
 * ```
 * @note
 *  - 大写字母的 ASCII 范围为 `65-90` (`A-Z`)
 */
export default function isUpperCase(value: string): boolean {
    return regex.test(value);
}

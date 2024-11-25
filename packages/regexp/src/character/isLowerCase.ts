const regex = /^[a-z]+$/;

/**
 * 是不是一个由 `a-z` 组成的小写字母字符串
 *
 * @param value 要判断的值
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 * ```typescript
 * console.log(isLowerCase('a')); // true
 * console.log(isLowerCase('A')); // false
 * console.log(isLowerCase('z')); // true
 * console.log(isLowerCase('Z')); // false
 * console.log(isLowerCase('1')); // false
 * ```
 * @note
 *  - 小写字母的 ASCII 范围为 `97-122` (`a-z`)
 */
export default function isLowerCase(value: string): boolean {
    return regex.test(value);
}

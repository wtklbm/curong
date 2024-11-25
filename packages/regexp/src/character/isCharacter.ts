const regex = /^[a-zA-Z]+$/;

/**
 * 是不是一个字母字符串 (包括小写字母 `a-z` 和大写字母 `A-Z`)
 *
 * @param value 要判断的值
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 * ```typescript
 * console.log(isCharacter('a')); // true
 * console.log(isCharacter('A')); // true
 * console.log(isCharacter('z')); // true
 * console.log(isCharacter('Z')); // true
 * console.log(isCharacter('1')); // false
 * ```
 * @note
 *  - 字母的 ASCII 范围为 `65-90` (`A-Z`) 或 `97-122` (`a-z`)
 */
export default function isCharacter(value: string): boolean {
    return regex.test(value);
}

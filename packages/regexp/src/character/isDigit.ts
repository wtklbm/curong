const regex = /^\d+$/;

/**
 * 是不是一个由 `0-9` 组成的数字字符串
 *
 * @param value 要判断的值
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 *
 * ```typescript
 * console.log(isDigit('1')); // true
 * console.log(isDigit('9')); // true
 * console.log(isDigit('a')); // false
 * console.log(isDigit('A')); // false
 * console.log(isDigit('!')); // false
 * ```
 *
 * @note
 *  - 数字的 ASCII 范围为 `48-57` (`0-9`)
 */
export default function isDigit(value: string): value is `${number}`;

/**
 * 是不是一个由 `0-9` 组成的数字
 *
 * @param value 要判断的值
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 *
 * ```typescript
 * console.log(isDigit(1)); // true
 * console.log(isDigit(9)); // true
 * console.log(isDigit('a')); // false
 * console.log(isDigit('A')); // false
 * console.log(isDigit('!')); // false
 * ```
 *
 * @note
 *  - 数字的 ASCII 范围为 `48-57` (`0-9`)
 */
export default function isDigit(value: number): value is number;

export default function isDigit(
    value: string | number
): value is `${number}` | number {
    return regex.test(String(value));
}

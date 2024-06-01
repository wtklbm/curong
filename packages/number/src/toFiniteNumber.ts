import { isFinite } from '@curong/types';

/**
 * 将值转换为有限数值。如果无法转换为有限数值，则返回默认值
 *
 * @param value 要转换的值
 * @param defaultValue 默认值，如果无法转换为有限数值时使用
 * @returns 有限数值或默认值
 * @example
 *
 * ```javascript
 * // 返回 42，因为字符串 "42" 可以转换为有限数值
 * const result1 = toFiniteNumber("42", 0);
 *
 * // 返回 0，因为字符串 "foo" 无法转换为有限数值，使用了默认值 0
 * const result2 = toFiniteNumber("foo", 0);
 *
 * // 返回 3.14，因为字符串 "3.14" 可以转换为有限数值
 * const result3 = toFiniteNumber("3.14", 0);
 *
 * // 返回 0，因为 undefined 无法转换为有限数值，使用了默认值 0
 * const result4 = toFiniteNumber(undefined, 0);
 * ```
 */
export default function toFiniteNumber(
    value: any,
    defaultValue: number
): number {
    return isFinite((value = +value)) ? value : defaultValue;
}

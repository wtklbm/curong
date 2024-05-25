import { isArray, isNumber } from '@curong/types';

/**
 * 判断一个数字的值是否在指定的范围内
 *
 * @param value 要检查的数字
 * @param range 要检查的范围。可以是一个数字或一个包含两个数字的数组
 *  - 如果 `range` 是一个单一的数字，则检查 `value` 是否在从 0 到该数字的范围内
 *  - 如果 `range` 是一个包含两个数字的数组，则检查 `value` 是否在这两个数字的最小值和最大值之间
 * @returns 如果 `value` 在指定范围内，则返回 `true`，否则返回 `false`
 * @throws 如果 `range` 不是一个数字或包含两个数字的数组，则抛出 `TypeError`
 * @example
 *
 * ```javascript
 * console.log(isInRange(5, 10)); // true
 * console.log(isInRange(5, [3, 10])); // true
 * ```
 */
export default function isInRange(
    value: number,
    range: number | [number, number]
): value is number {
    if (isNumber(range)) {
        return value >= Math.min(0, range) && value <= Math.max(0, range);
    } else if (isArray(range) && range.length === 2) {
        return value >= Math.min(...range) && value <= Math.max(...range);
    }

    throw new TypeError(`[isInRange] 无效的范围: ${JSON.stringify(range)}`);
}

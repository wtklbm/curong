import { isArray, isNumber } from '@curong/types';

/**
 * 判断一个数字的值是否在指定的范围内
 *
 * @param value 要检查的数字
 * @param range 要检查的范围。可以是一个数字或一个包含两个数字的数组
 *  - 如果 `range` 是一个单一的数字，则检查 `value` 是否在从 0 到该数字的范围内
 *  - 如果 `range` 是一个包含两个数字的数组，则检查 `value` 是否在这两个数字的最小值和最大值之间
 * @returns 如果 `value` 在指定范围内，则返回 `true`，否则返回 `false`
 * @throws
 *  - 如果 `value` 不是一个非 `NaN` 的数字，则会抛出 `TypeError`
 *  - 如果 `range` 不是一个非 `NaN` 的数字或包含两个数字的数组，则会抛出 `TypeError`
 * @example
 *
 * ```javascript
 * console.log(inRange(5, 10)); // true
 * console.log(inRange(5, [3, 10])); // true
 * ```
 */
export default function inRange(
    value: number,
    range: number | [number, number]
): value is number {
    if (!isNumber(value)) {
        throw new TypeError(`[inRange] value 必须是有效的数字，不能为 NaN`);
    }

    if (isNumber(range)) {
        return value >= Math.min(0, range) && value <= Math.max(0, range);
    }

    if (isArray(range) && range.length === 2 && range.every(v => isNumber(v))) {
        const [min, max] = range;
        return value >= Math.min(min, max) && value <= Math.max(min, max);
    }

    throw new TypeError(
        `[inRange] 必须是有效的数字或数字范围: ${JSON.stringify(range)}`
    );
}

/**
 * 检查数组中所有元素是否满足给定条件
 *
 * @param value 要验证的值或值数组
 * @param predicate 要满足的条件或条件数组
 * @returns 如果所有元素都满足条件，则返回 `true`，否则为 `false`
 * @example
 *
 * ```javascript
 * isEvery([1, 2, 3], v => v > 0); // true
 * isEvery([1, 2, 3], [v => v > 0, v => v < 4]); // true
 * isEvery([1, 2, 3], [isNumberSafe, isNumberHave]); // true
 * ```
 */
export default function isEvery<
    V extends unknown,
    P extends (value: V) => boolean
>(value: V | V[], predicate: P | P[]): value is V {
    const v = [value].flat() as V[];
    return [predicate].flat().every(f => v.every(f));
}

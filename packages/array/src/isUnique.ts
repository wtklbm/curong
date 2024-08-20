/**
 * 判断数组中的所有元素是否都是唯一的
 *
 * @param array 要检查的数组
 * @returns 是则返回 `true`，否则为 `false`。空数组的结果为 `true`
 * @example
 *
 * ```typescript
 * isUnique([1, 2, 3, 4]); // true
 * isUnique([1, 2, 2, 3]); // false
 * isUnique([NaN, NaN]); // false
 * isUnique([NaN, 1, 2]); // true
 * ```
 */
export default function isUnique<T extends unknown[]>(array: T): boolean {
    const uniqueValues = new Set();

    for (let i = 0, v: any; i < array.length; i++) {
        v = array[i];

        if (uniqueValues.has(v)) {
            return false;
        }

        uniqueValues.add(v);
    }

    return true;
}

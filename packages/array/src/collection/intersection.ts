/**
 * 获取两个数组的交集，即在 `a` 和 `b` 中都存在的元素
 *
 * @param a 第一个数组
 * @param b 第二个数组
 * @returns 返回一个去重后的新数组，包含所有在 `a` 和 `b` 中都存在的元素
 * @example
 * ```typescript
 * console.log(intersection([1, 2, 3], [2, 3, 4, 5])); // [2, 3]
 *
 * // 当 a 为空数组时，返回空数组
 * console.log(intersection([], [1, 2, 3])); // []
 *
 * // 当 b 为空数组时，返回空数组
 * console.log(intersection([1, 2, 3], [])); // []
 * ```
 */
export default function intersection<T>(a: T[], b: T[]): T[] {
    const setB = new Set(b);
    return [...new Set(a.filter(x => setB.has(x)))];
}

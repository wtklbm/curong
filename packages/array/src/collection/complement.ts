/**
 * 获取两个数组的补集，即在 `b` 中存在但在 `a` 中不存在的元素
 *
 * @param a 第一个数组
 * @param b 第二个数组
 * @returns 返回一个去重后的新数组，包含所有在 `b` 中存在但在 `a` 中不存在的元素
 * @example
 * ```typescript
 * console.log(complement([1, 2, 3], [2, 3, 4, 5])); // [4, 5]
 *
 * // 当 a 为空数组时，返回 b 的所有元素
 * console.log(complement([], [1, 2, 3])); // [1, 2, 3]
 *
 * // 当 b 为空数组时，返回空数组
 * console.log(complement([1, 2, 3], [])); // []
 * ```
 */
export default function complement<T>(a: T[], b: T[]): T[] {
    const setA = new Set(a);
    return [...new Set(b.filter(x => !setA.has(x)))];
}

/**
 * 获取两个数组的并集，即合并两个数组并去除重复元素
 *
 * @param a 第一个数组
 * @param b 第二个数组
 * @returns 返回一个去重后的新数组，包含所有来自 `a` 和 `b` 的元素
 * @example
 * ```typescript
 * console.log(union([1, 2, 3], [3, 4, 5])); // [1, 2, 3, 4, 5]
 *
 * // 当其中一个数组为空时
 * console.log(union([], [1, 2, 3])); // [1, 2, 3]
 * console.log(union([1, 2, 3], [])); // [1, 2, 3]
 *
 * // 当两个数组都为空时
 * console.log(union([], [])); // []
 * ```
 */
export default function union<T>(a: T[], b: T[]): T[] {
    return [...new Set(a.concat(b))];
}

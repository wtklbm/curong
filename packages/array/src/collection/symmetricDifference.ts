import difference from './difference';
import union from './union';

/**
 * 获取两个数组的对称差集，即在 `a` 或 `b` 中存在，但不在两者都有的元素
 *
 * @param a 第一个数组
 * @param b 第二个数组
 * @returns 返回一个去重后的新数组，包含所有在 `a` 或 `b` 中存在但不在两者都有的元素
 * @example
 * ```typescript
 * console.log(symmetricDifference([1, 2, 3], [2, 3, 4, 5])); // [1, 4, 5]
 *
 * // 当 a 为空数组时，返回 b 的所有元素
 * console.log(symmetricDifference([], [1, 2, 3])); // [1, 2, 3]
 *
 * // 当 b 为空数组时，返回 a 的所有元素
 * console.log(symmetricDifference([1, 2, 3], [])); // [1, 2, 3]
 * ```
 */
export default function symmetricDifference<T>(a: T[], b: T[]): T[] {
    return union(difference(a, b), difference(b, a));
}

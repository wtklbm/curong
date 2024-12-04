/**
 * 判断一个数组是否包含另一个数组的所有元素
 *
 * 该函数检查 `value` 数组是否包含 `array` 数组中的所有元素。
 * 使用 `Set` 结构来提高查找效率。`array` 中的每个元素必须都存在于 `value` 中，顺序无关。
 *
 * @template T 数组元素的类型
 * @param value 待检查的主数组
 * @param array 被检查的子数组
 * @returns 返回一个布尔值，`true` 表示 `value` 包含 `array` 的所有元素
 * @example
 * ```typescript
 * console.log(includesEvery([1, 2, 3, 4], [2, 3])); // true
 * console.log(includesEvery(['a', 'b', 'c'], ['b', 'a'])); // true
 * console.log(includesEvery([1, 2, 3], [4])); // false
 * console.log(includesEvery([1, 2], [1, 2, 3])); // false
 * console.log(includesEvery([true, false], [true])); // true
 * ```
 * @note
 *  - 该函数使用 `Set` 结构来优化查找操作，时间复杂度为 `O(n + m)`，其中 `n` 是 `value` 数组的长度，`m` 是 `array` 数组的长度
 *  - 如果 `array` 比 `value` 长，函数会立即返回 `false`，因为 `value` 不可能包含比自身更多的元素
 *  - 顺序无关，函数只检查元素是否存在，而不考虑元素的顺序
 *  - 如果数组中包含复杂类型（如对象或数组），请注意 JavaScript 中的引用相等性问题
 *  - 适用于检查集合关系或验证子集是否存在于主集合中的场景
 */
export default function includesEvery<T>(value: T[], array: T[]): boolean {
    if (array.length > value.length) {
        return false;
    }

    for (let i = 0, s = new Set(value); i < array.length; i++) {
        if (!s.has(array[i])) {
            return false;
        }
    }

    return true;
}

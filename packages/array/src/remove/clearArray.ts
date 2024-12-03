/**
 * 清空数组并返回被移除的元素
 *
 * 该函数使用 `splice` 方法清空传入的数组，并返回被移除的元素数组。
 * 此函数直接操作原数组，使其长度变为 0，同时返回删除的元素。
 * 适用于需要在清空数组时获取被移除的所有元素的场景。
 *
 * @template T 数组元素的类型
 * @param value 需要清空的数组
 * @returns 返回包含被移除元素的数组
 * @example
 * ```typescript
* const numbers = [1, 2, 3, 4];
* const removed = clearArray(numbers);
* console.log(numbers); // []
* console.log(removed); // [1, 2, 3, 4]
*
* const strings = ['a', 'b', 'c'];
* const removedStrings = clearArray(strings);
* console.log(strings); // []
* console.log(removedStrings); // ['a', 'b', 'c']
* ```
* @note
*  - 使用此方法时，如果不需要保留移除的元素，可以忽略返回值
*  - 时间复杂度为 `O(n)`，其中 `n` 为数组的长度，因此在处理大数组时需注意性能
*  - 也可以直接调用 `value.length = 0` 来清空当前数组
*/
export default function clearArray<T>(value: T[]): T[] {
    return value.splice(0, value.length);
}

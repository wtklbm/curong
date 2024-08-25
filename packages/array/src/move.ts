/**
 * 将数组中的指定元素从 `from` 移动到 `to`
 *
 * @param array 要操作的数组
 * @param from 要移动的元素的起始索引。如果是负数，则表示从数组末尾开始计数
 * @param to 要移动的目标位置索引。如果是负数，则表示从数组末尾开始计数
 * @returns 返回修改后的数组，其中指定的元素已被移动到新的位置
 * @throws 如果起始索引和结果索引不在数组的索引范围内，则会抛出范围错误异常
 * @example
 *
 * ```typescript
 * const arr = [1, 2, 3, 4, 5];
 * const result = move(arr, 1, 3);
 * console.log(result); // [1, 3, 4, 2, 5]
 *
 * const arr2 = [1, 2, 3, 4, 5];
 * const result2 = move(arr2, -4, -1);
 * console.log(result2); // [1, 3, 4, 5, 2]
 * ```
 */
export default function move<T>(array: T[], from: number, to: number): T[] {
    const startIndex = from < 0 ? array.length + from : from;

    if (startIndex < 0 || startIndex >= array.length) {
        throw new RangeError(
            `[move] 起始索引必须在数组的索引范围内。from: ${from}, startIndex: ${startIndex}`
        );
    }

    const endIndex = to < 0 ? array.length + to : to;

    if (endIndex < 0 || endIndex >= array.length) {
        throw new RangeError(
            `[move] 结束索引必须在数组的索引范围内。to: ${to}, endIndex: ${endIndex}`
        );
    }

    // 如果起始索引和结束索引相同，则不需要移动
    if (startIndex === endIndex) {
        return array;
    }

    // 移动元素
    const [item] = array.splice(startIndex, 1);
    array.splice(endIndex, 0, item);

    return array;
}

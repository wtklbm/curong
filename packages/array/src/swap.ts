/**
 * 交换数组中两个指定索引的元素
 *
 * @param value 要进行交换的数组
 * @param i 要交换的第一个元素的索引
 * @param j 要交换的第二个元素的索引
 * @returns 返回修改后的数组
 * @throws 当索引 `i` 或 `j` 超出数组的边界时抛出错误
 * @example
 *
 * ```typescript
 * const arr = [1, 2, 3, 4];
 * const swapped = swap(arr, 0, 2);
 * console.log(swapped); // [3, 2, 1, 4]
 * ```
 */
export default function swap<T>(value: T[], i: number, j: number): T[] {
    if (i < 0 || i >= value.length || j < 0 || j >= value.length) {
        throw new RangeError('[swap] 索引已超出数组范围', {
            cause: { value, i, j }
        });
    }

    [value[i], value[j]] = [value[j], value[i]];

    return value;
}

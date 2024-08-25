/**
 * 异步串行遍历数组并对每个元素依次执行回调函数
 *
 * @param value 要遍历的数组
 * @param callback 对每个元素执行的异步串行回调函数
 * @returns 返回一个 `Promise`，解析为包含处理结果的新数组
 * @example
 *
 * ```typescript
 * const arr = [1, 2, 3, 4];
 *
 * await mapAsync(arr, async (value, index) => {
 *     console.log(`索引 ${index} 的值是 ${value}`);
 *     return `${value}`.toLowerCase();
 * }); // [ '1', '2', '3', '4' ]
 * ```
 */
export default async function mapAsync<T, R>(
    value: T[],
    callback: (value: T, index: number, array: T[]) => Promise<R> | R
): Promise<R[]> {
    const result = [];

    for (let index = 0; index < value.length; index++) {
        result.push(await callback(value[index], index, value));
    }

    return result;
}

/**
 * 异步并行遍历数组并对每个元素执行回调函数
 *
 * @param value 要遍历的数组
 * @param callback 对每个元素执行的异步并行回调函数
 * @returns 返回一个 `Promise`，解析为包含处理结果的新数组
 * @example
 *
 * ```typescript
* const arr = [1, 2, 3, 4];
*
* await mapParallel(arr, async (value, index) => {
*     console.log(`索引 ${index} 的值是 ${value}`);
*     return `${value}`.toLowerCase();
* }); // [ '1', '2', '3', '4' ]
* ```
*/
export default async function mapParallel<T, R>(
    value: T[],
    callback: (value: T, index: number, array: T[]) => Promise<R>,
): Promise<R[]> {
    const result: Promise<R>[] = [];

    for (let index = 0; index < value.length; index++) {
        result.push(callback(value[index], index, value));
    }

    return await Promise.all(result);
}

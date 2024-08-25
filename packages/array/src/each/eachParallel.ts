/**
 * 异步并行遍历数组并对每个元素执行回调函数
 *
 * @param value 要遍历的数组
 * @param callback 对每个元素执行的异步并行回调函数
 * @returns 返回一个 `Promise`，当遍历完成或被中断时，`Promise` 将被解析
 * @example
 *
 * ```typescript
 * const arr = [1, 2, 3, 4];
 *
 * await eachParallel(arr, async (value, index) => {
 *     console.log(`索引 ${index} 的值是 ${value}`);
 * });
 * ```
 */
export default async function eachParallel<T>(
    value: T[],
    callback: (value: T, index: number, array: T[]) => Promise<void> | void
): Promise<void> {
    const promises: (Promise<void> | void)[] = [];

    for (let index = 0; index < value.length; index++) {
        promises.push(callback(value[index], index, value));
    }

    await Promise.all(promises);
}

/**
 * 异步串行遍历数组并对每个元素依次执行回调函数
 *
 * @param value 要遍历的数组
 * @param callback 对每个元素执行的异步串行回调函数。如果回调函数返回 `true`，遍历将立即终止
 * @returns 返回一个 `Promise`，当遍历完成或被中断时，`Promise` 将被解析
 * @example
 *
 * ```typescript
 * const arr = [1, 2, 3, 4];
 *
 * await eachAsync(arr, async (value, index) => {
 *     console.log(`索引 ${index} 的值是 ${value}`);
 *
 *     if (value === 3) {
 *         return true; // 遇到值为 3 时停止遍历
 *     }
 * });
 * ```
 */
export default async function eachAsync<T>(
    value: T[],
    callback: (
        value: T,
        index: number,
        array: T[]
    ) => Promise<void | boolean> | void | boolean
): Promise<void> {
    for (let index = 0; index < value.length; index++) {
        if ((await callback(value[index], index, value)) === true) {
            return;
        }
    }
}
/**
 * 从右到左异步并行遍历数组并对每个元素执行异步回调函数
 *
 * @param value 要遍历的数组
 * @param callback 对每个元素执行的异步并行回调函数
 * @returns 返回一个 `Promise`，当遍历完成或被中断时，`Promise` 将被解析
 * @example
 *
 * ```typescript
* const arr = [1, 2, 3, 4];
*
* await eachRightParallel(arr, async (value, index) => {
*     console.log(`索引 ${index} 的值是 ${value}`);
* });
* ```
*/
export default async function eachRightParallel<T>(
    value: T[],
    callback: (value: T, index: number, array: T[]) => void | Promise<void>
): Promise<void> {
    const promises: (void | Promise<void>)[] = [];
    let length = value.length;

    while (length--) {
        promises.push(callback(value[length], length, value));
    }

    await Promise.all(promises);
}

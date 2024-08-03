import { isFunction } from '@curong/types';

/**
 * 执行一个任务，并在任务失败时执行后备任务或返回后备值
 *
 * @param task 要执行的任务。可以是 `Promise`、同步函数或异步函数
 * @param fallback 当执行的任务抛出错误时使用的备用函数或备用值
 * @param args 传递给 `task` 和 `fallback` 的参数 (`fallback` 的参数从第二个开始)
 * @returns 返回一个操作成功时的值或发生错误时的备用值。
 *  如果 `task` 执行报错且没有传递 `fallback` 参数，则函数将返回  `undefined`
 * @throws 如果 `task` 执行报错且 `fallback` 也抛出了错误，则函数将抛出 `fallback` 产生的错误
 * @example
 *
 * ```typescript
 * const result = await ifThrow(() => {
 *     throw new Error('获取数据失败');
 * }, 'defaultData');
 *
 * console.log(result); // 'defaultData'
 * ```
 */
export default async function ifThrow<A extends unknown[], T>(
    task: ((...args: A) => any) | Promise<any>,
    fallback?:
        | (<E extends Error, R>(error: E, ...args: A) => R | Promise<R>)
        | Promise<any>
        | T
        | null
        | undefined,
    ...args: A
) {
    try {
        return await (isFunction(task) ? task.apply(task, args) : task);
    } catch (error: any) {
        return await (isFunction(fallback)
            ? fallback.call(fallback, error, ...args)
            : fallback);
    }
}

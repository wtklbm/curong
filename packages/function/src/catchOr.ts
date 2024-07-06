import { isFunction } from '@curong/types';

/**
 * 执行一个任务，并在任务失败时执行后备任务或返回后备值
 *
 * @param task 要执行的任务。可以是异步函数、同步函数或 `Promise`
 * @param fallback 当执行的任务抛出错误时使用的备用函数或备用值
 * @returns 返回一个操作成功时的值或发生错误时的备用值
 * @throws 如果在执行 `fallback` 时出错，则会抛出异常
 * @example
 *
 * ```typescript
 * const result = await catchOr(() => {
 *     throw new Error('获取数据失败');
 * }, 'defaultData');
 *
 * console.log(result); // 'defaultData'
 * ```
 */
export default async function catchOr<A extends unknown[], T>(
    task: ((...args: A) => any) | Promise<any>,
    fallback?:
        | (<E extends Error, T>(error: E, ...args: A) => T | Promise<T>)
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

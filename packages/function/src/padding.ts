import { isFunction } from '@curong/types';

/**
 * 等待任务的执行，并等待结果的返回
 *
 * @param task 要执行的任务
 * @param args 要传递给任务的参数
 * @returns 返回一个数组，数组的第一项为任务的结果，第二项为该任务执行过程中所抛出的错误。
 *  - 如果任务有返回结果，则数组的第一项为任务的结果，第二项为 `null`
 *  - 如果任务抛出错误，则数组的第一项为 `null`，第二项为错误的值，该值可能是一个 `Error` 也可能是任意的值
 * @example
 *
 * ```javascript
 * const [data, error] = await padding(Promise.resolve(1));
 * consol.log({data, error}); // { data: 1, error: null }
 * ```
 */
export default async function padding<R, A extends unknown[], E>(
    task: ((...args: A) => R) | Promise<R>,
    ...args: A
): Promise<[R | null, E | null]> {
    try {
        return [
            await (isFunction<R, A>(task) ? task.apply(task, args) : task),
            null
        ];
    } catch (error: any) {
        return [null, error];
    }
}
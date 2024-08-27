import executeToPromise from '../promise/executeToPromise';
import type { ResolvableTimeoutMs } from '../timeout/timeoutMsResolve';

import delay from './delay';

/**
 * 等待一段时间后执行一个同步或异步的函数
 *
 * @param duration 要阻塞多长时间，以毫秒为单位
 * @param task 要执行的函数，可以是同步函数或异步函数
 * @param args 传递给 `task` 的参数
 * @returns 返回 `task` 的执行结果
 * @example ````
 *
 * ### 传递一个数字
 *
 * ```typescript
 * // 等待 `10ms` 后执行函数
 * delayRun(10, () => console.log('hello'));
 * ```
 *
 * ### 传递一个对象
 *
 * ```typescript
 * // 从 `3s` 或 `8s` 间生成一个随机时间，等待并执行函数
 * delayRun({ start: 3e3, end: 8e3 }, () => console.log('hello'));
 * ```
 */
export default async function delayRun<R, A extends unknown[]>(
    duration: ResolvableTimeoutMs,
    task: (...args: A) => Promise<R> | R,
    ...args: A
): Promise<R> {
    await delay(duration);

    return await executeToPromise(task, args);
}

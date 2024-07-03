import { isFunction, isUndefined, isZero } from '@curong/types';

import sleepAsync from './sleepAsync';
import type { LimiterOptions } from './types';

/**
 * 异步限流器函数，用于控制并发执行任务，支持失败重试和进度回调
 *
 * @param tasks 要执行的任务数组，每个任务可以是一个同步函数、异步函数、`Promise` 或任意类型的普通值
 * @param options 配置选项对象，用于设置并发数、错误处理、重试设置和进度回调等
 *  - `concurrency`: 最大并发运行的任务数量。默认为 `1`，即一个任务一个任务地连续执行
 *  - `maxRetry`: 任务失败时的最大重试次数。默认为 `0`，即默认情况下不重试任务
 *  - `retryWait`: 重试失败任务之前等待的时间（以毫秒为单位）。默认为 `0`，即不等待
 *  - `onError`: 处理任务执行过程中发生的错误的函数
 *  - `onProgress`: 每次任务完成时调用的回调函数
 *  - `onProgressRetry`: 每次任务失败并重试时调用的回调函数
 * @returns 返回一个包含任务结果的数组
 * @throws 如果任务执行失败且没有提供 `onError` 来处理错误时，将抛出错误
 * @example
 *
 * ```javascript
* const arr = [1, 2, 3, 4];
* const mapper = (v: number) => Promise.resolve(v * v);
* const pool = await limiter(arr.map(mapper));
* console.log(pool); // [1, 4, 9, 16]
 * ```
 */
export default async function limiter<T extends unknown[]>(
    tasks: T,
    options: LimiterOptions = {}
) {
    const {
        concurrency = 1,
        maxRetry = 0,
        retryWait = 0,
        onError,
        onProgress,
        onProgressRetry
    } = options;

    const ret: any[] = [];
    const isOnError = isFunction(onError);
    const isOnProgress = isFunction(onProgress);
    const isOnProgressRetry = isFunction(onProgressRetry);

    let index = 0;
    let completedTasks = 0;

    const runTask = async (task: unknown, i: number) => {
        try {
            ret[i] = await (isFunction(task) ? task() : task);
        } catch (e: any) {
            e.message = `[limiter] 执行第 ${i} 个任务时出错: ${e.message}`;
            e.cause = { index: i, tasks, options };
            throw e;
        }
    };

    async function worker() {
        while (index < tasks.length) {
            const i = index++;
            const task = tasks[i];
            let attempts = -1;
            let success = false;
            let firstError: Error;

            while (attempts < maxRetry && !success) {
                try {
                    await runTask(task, i);

                    success = true;
                    completedTasks++;

                    if (isOnProgress) {
                        onProgress(i, ret[i]);
                    }
                } catch (e: any) {
                    attempts++;

                    if (isZero(attempts)) {
                        firstError = e;
                    } else if (isOnProgressRetry) {
                        onProgressRetry(i, e, attempts);
                    }

                    if (attempts >= maxRetry) {
                        if (isOnError) {
                            const newValue = onError(e);

                            if (!isUndefined(newValue)) {
                                ret[i] = newValue;
                            }
                        } else {
                            throw firstError!;
                        }
                    } else if (retryWait > 0) {
                        await sleepAsync(retryWait);
                    }
                }
            }
        }
    }

    await Promise.all(
        Array.from({ length: Math.min(concurrency, tasks.length) }, worker)
    );

    return ret;
}

import { range } from '@curong/number';
import {
    isAnyError,
    isFunction,
    isTypeofObject,
    isUndefined,
    isZero
} from '@curong/types';

import delay from '../delay/delay';
import type { ParallelOptions } from './types';

/**
 * 一个异步并发器，用于控制并发执行任务，支持失败重试和进度回调
 *
 * @param tasks 要执行的任务数组，每个任务可以是一个同步函数、异步函数、`Promise` 或任意类型的普通值
 * @param options 配置选项对象，用于设置并发数、错误处理、重试设置和进度回调等
 *  - `concurrency`: 任务的最大并发数量。默认为任务的长度，即所有任务并行执行
 *  - `maxRetry`: 任务失败时的最大重试次数。默认为 `0`，即默认情况下不重试任务
 *  - `retryWait`: 重试失败任务之前等待的时间（以毫秒为单位）。默认为 `0`，即不等待
 *  - `onError`: 处理任务执行过程中发生的错误的函数
 *  - `onProgress`: 每次任务完成时调用的回调函数
 *  - `onProgressRetry`: 每次任务失败并重试时调用的回调函数
 * @returns 返回一个包含任务结果的数组 (如果有任务执行失败，则可能是**稀疏数组**)
 * @throws 如果任务执行失败且没有提供 `onError` 来处理错误，将通过 `AggregateError` 抛出自第一次执行以来的所有错误
 * @example
 *
 * ```typescript
 * const arr = [1, 2, 3, 4];
 * const mapper = (v: number) => Promise.resolve(v * v);
 * const pool = await parallel(arr.map(mapper));
 * console.log(pool); // [1, 4, 9, 16]
 * ```
 */
export default async function parallel<T extends unknown[]>(
    tasks: T,
    options: ParallelOptions = {}
) {
    const {
        concurrency = tasks.length,
        maxRetry = 0,
        retryWait = 0,
        onError,
        onProgress,
        onProgressRetry
    } = options;

    const ret: any[] = [];
    const getWaitTime = isTypeofObject(retryWait)
        ? () => range(retryWait.start, retryWait.end)
        : () => retryWait;
    const isOnError = isFunction(onError);
    const isOnProgress = isFunction(onProgress);
    const isOnProgressRetry = isFunction(onProgressRetry);

    let index = 0;
    let completedTasks = 0;

    const runTask = async (task: unknown, i: number) => {
        try {
            ret[i] = await (isFunction(task) ? task() : task);
        } catch (e: any) {
            if (isAnyError(e)) {
                e.message = `[parallel] 执行第 ${i} 个任务时出错: ${e.message}`;
                e.cause = { index: i, tasks, options };
            }
            throw e;
        }
    };

    async function worker() {
        while (index < tasks.length) {
            const i = index++;
            const task = tasks[i];
            const errors = [];
            let attempts = -1;
            let success = false;

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

                    if (
                        !isZero(attempts) && // 如果当前正在进行重试
                        isOnProgressRetry && // 如果传递了重试回调
                        onProgressRetry(i, e, attempts) // 只要回调返回了真值
                    ) {
                        if (isOnError) {
                            const newValue = onError(e);

                            // 如果不想继续重试了，那么就看看 `onError` 有没有返回值
                            if (!isUndefined(newValue)) {
                                // 如果有就直接赋值就行了
                                ret[i] = newValue;
                            }
                        }

                        // 不再执行该任务，继续执行下一个任务
                        continue;
                    }

                    errors.push(e);

                    if (attempts >= maxRetry) {
                        // 如果用户选择手动处理错误
                        if (isOnError) {
                            const newValue = onError(e);

                            // 只有在经过多次重试之后，才使用备用值
                            if (!isUndefined(newValue)) {
                                ret[i] = newValue;
                            }
                        } else {
                            throw new AggregateError(
                                errors,
                                `[parallel] 第 ${i} 个任务执行失败`,
                                { cause: { index: i, task, options } }
                            );
                        }
                    } else {
                        const waitTime = getWaitTime();

                        if (waitTime > 0) {
                            await delay(waitTime);
                        }
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

import { isAnyError, isFunction } from '@curong/types';

import retry from '../catch/retry';
import { toPromise } from '../promise';

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
export default async function parallel<T>(
    tasks: T[],
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
    let index = 0;

    const runTask = async (task: unknown, i: number) => {
        try {
            return await toPromise(task);
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

            try {
                ret[i] = await retry(maxRetry, () => runTask(task, i), {
                    retryWait,
                    onError: isFunction(onError)
                        ? e => onError(i, e)
                        : undefined,
                    onProgressRetry: isFunction(onProgressRetry)
                        ? (e, a) => onProgressRetry(i, e, a)
                        : undefined
                });

                if (isFunction(onProgress)) {
                    onProgress(i, ret[i]);
                }
            } catch (e: any) {
                if (isAnyError(e)) {
                    // @ts-ignore
                    (e.cause ?? (e.cause = {})).index = i;
                }
                throw e;
            }
        }
    }

    await Promise.all(
        Array.from({ length: Math.min(concurrency, tasks.length) }, worker)
    );

    return ret;
}

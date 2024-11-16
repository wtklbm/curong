import { isUintSafeFilled } from '@curong/types';

import { delay } from '../delay';
import { toPromise } from '../promise';

import type { RetryWithConditionOptions } from './types';

/**
 * 执行一个任务，直到条件满足或达到最大重试次数
 *
 * @param task 要执行的异步任务，可以是一个同步函数或异步函数
 * @param condition 用于判断任务结果是否满足继续执行的条件
 *  - 如果值为 `true`，则直接返回任务的结果
 *  - 如果值为 `false`，则继续重试，直到达到最大重试次数或条件满足
 * @param options 配置选项
 *  - `retryWait`: 每次重试之间的等待毫秒数
 *  - `maxRetries`: 最大重试次数，超过次数将抛出错误
 * @returns 当任务结果满足条件时，返回该结果
 * @throws
 *  - 如果 `retryWait` 不是安全的无符号整数，则会抛出异常
 *  - 如果 `maxRetries` 不是安全的无符号整数，则会抛出异常
 *  - 当达到最大重试次数时，将抛出异常
 * @note 需要确保在 `task` 或 `condition` 中处理好可能的异常，否则会导致无限重试
 * @example
 *
 * ```typescript
 * const task = () => (Math.random() > 0.5 ? '成功' : '失败');
 * const condition = (result: string) => result === '成功';
 * const result = await retryWithCondition(task, condition, { maxRetries: 5 });
 * console.log(result); // 成功
 * ```
 */
export default async function retryWithCondition<T>(
    task: (...args: any[]) => Promise<T> | T,
    condition: (result: T) => Promise<boolean> | boolean,
    options?: RetryWithConditionOptions
): Promise<T> {
    const { retryWait, maxRetries } = { ...options };
    let retryWaitFn = async () => {};
    let maxRetriesFn = () => {};

    if (retryWait) {
        if (!isUintSafeFilled(retryWait)) {
            throw new TypeError(
                `[retryWithCondition] retryWait 必须是安全的无符号整数: ${retryWait}`
            );
        }

        retryWaitFn = async () => await delay(retryWait);
    }

    if (maxRetries) {
        if (!isUintSafeFilled(maxRetries)) {
            throw new TypeError(
                `[retryWithCondition] maxRetries 必须是安全的无符号整数: ${maxRetries}`
            );
        }

        maxRetriesFn = () => {
            if (retryCount >= maxRetries) {
                throw new Error(`[retryWithCondition] 已达到最大重试次数`);
            }
        };
    }

    let retryCount = 0;

    while (true) {
        const res = await toPromise(task);

        if (await condition(res)) {
            return res;
        }

        maxRetriesFn();
        retryCount++;
        await retryWaitFn();
    }
}

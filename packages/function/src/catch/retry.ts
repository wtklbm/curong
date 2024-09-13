import { range } from '@curong/number';
import {
    isFunction,
    isTrue,
    isTypeofObject,
    isUndefined,
    isZero
} from '@curong/types';

import delay from '../delay/delay';
import { toPromise } from '../promise';

import type { RetryOptions } from './types';

/**
 * 当执行失败后进行重试
 *
 * `retry` 函数允许在任务失败时进行多次重试，并在每次重试之间等待指定的时间。可以通过回调函数处理错误或在重试过程中进行自定义逻辑。
 *
 * @param maxRetry 任务失败时的最大重试次数
 * @param task 要执行的任务,可以是一个返回 `Promise` 的函数，或者 `Promise` 对象
 * @param options 配置选项
 *  - `retryWait`: 重试失败任务之前等待的时间（以毫秒为单位）。默认为 `0`，即不等待
 *  - `onError`: 当任务执行过程中发生错误时执行的回调函数
 *  - `onRetry`: 当任务执行失败并重试时执行的回调函数
 * @returns 成功时返回任务的结果，如果在达到最大重试次数后仍然失败，则返回 `undefined` 或抛出错误
 *  - 如果在每次重试时 `onRetry` 都返回了 `true` 且没有传递 `onError`，则该函数的返回结果为 `undefined`
 *  - 如果在每次重试时 `onRetry` 都返回了 `true` 且传递了 `onError`，如果 `onError` 有返回结果，则使用该结果，否则返回 `undefined`
 * @throws 如果经过最大执行次数后，且没有传递 `onError`，则会抛出 `AggregateError` 异常
 */
export default async function retry<T>(
    maxRetry: number,
    task: (() => Promise<T> | T) | Promise<T>,
    options: RetryOptions<T> = {}
): Promise<T | undefined> {
    const { retryWait = 0, onError, onRetry } = options;
    const errors: Error[] = [];
    const getWaitTime = isTypeofObject(retryWait)
        ? () => range(retryWait.start, retryWait.end)
        : () => retryWait;
    const isOnError = isFunction(onError);
    const isOnProgressRetry = isFunction(onRetry);

    let attempts = -1;

    while (attempts < maxRetry) {
        try {
            return await toPromise(task);
        } catch (e: any) {
            attempts++;

            if (
                !isZero(attempts) && // 如果当前正在进行重试
                isOnProgressRetry && // 如果传递了重试回调
                isTrue(onRetry(e, attempts)) // 只要回调返回了 `true`
            ) {
                if (isOnError) {
                    const newValue = onError(e);

                    // 如果不想继续重试了，那么就看看 `onError` 有没有返回值
                    if (!isUndefined(newValue)) {
                        // 如果有就直接赋值就行了
                        return newValue;
                    }
                }

                // 不再执行该任务
                return;
            }

            errors.push(e);

            if (attempts >= maxRetry) {
                // 如果用户选择手动处理错误
                if (isOnError) {
                    const newValue = onError(e);

                    // 只有在经过多次重试之后，才使用备用值
                    if (!isUndefined(newValue)) {
                        return newValue;
                    }
                } else {
                    throw new AggregateError(
                        errors,
                        `当前任务经过 ${attempts} 次重试后失败了`,
                        { cause: { task, attempts, error: e } }
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

import { isPromise, isUint, isUndefined } from '@curong/types';

import type {
    CollectItemsLimitedOptions,
    CollectItemsLimitedResult,
    CollectItemsOptions,
    CollectItemsResult
} from './types';

/**
 * 收集 `total` 个 `Promise`，并在到达 `total` 个数时，返回收集的 `Promise` 数组的结果
 *
 * @param options 收集的选项
 *
 *  - `total`: 接收多少项后返回结果
 *  - `isRestart`: 是否在返回结果后，重新开始新的收集，默认为 `false`
 *  - `isAccumulate`: 在开始新的收集时，是否和之前收集的结果进行累加，默认为 `false`
 *
 * @returns 返回一个函数，函数包含一个参数，并返回一个包含 `done` 和 `value` 的对象
 * @example
 *
 * ```javascript
 * let total = 0;
 * const f = async () => Promise.resolve(++total);
 * const collectItem = collectItems({ total: 2 });
 *
 * console.log(await collectItem(f())); // { done: false, value: undefined }
 * console.log(await collectItem(f())); // { done: true, value: [1, 2] }
 * console.log(await collectItem(f())); // { done: false, value: undefined }
 * console.log(await collectItem(f())); // { done: false, value: undefined }
 * ```
 */
export default function collectItems<T>(
    options: CollectItemsLimitedOptions
): CollectItemsLimitedResult<T>;

/**
 * 不停的收集 `Promise`，并在传递 `true` 的时候，返回收集的 `Promise` 数组的结果
 *
 * @param options 收集的选项
 *
 *  - `isRestart`: 是否在返回结果后，重新开始新的收集，默认为 `false`
 *  - `isAccumulate`: 在开始新的收集时，是否和之前收集的结果进行累加，默认为 `false`
 *
 * @returns 返回一个函数，函数包含两个参数，并返回一个包含 `done` 和 `value` 的对象
 * @example
 *
 * ```javascript
 * let total = 0;
 * const f = async () => Promise.resolve(++total);
 * const collectItem = collectItems();
 *
 * console.log(await collectItem(f())); // { done: false, value: undefined }
 * console.log(await collectItem(f(), true)); // { done: true, value: [1, 2] }
 * console.log(await collectItem(f())); // { done: false, value: undefined }
 * console.log(await collectItem(f())); // { done: false, value: undefined }
 * ```
 */
export default function collectItems<T = unknown>(
    options?: CollectItemsOptions
): CollectItemsResult<T>;

export default function collectItems(options?: any) {
    const { total, isRestart = false, isAccumulate = false } = options ?? {};
    const promises: Promise<any>[] = [];
    let isOverOnce = false;

    if (total && !isUint(total)) {
        throw new TypeError(
            `[collectItems]: total不是一个有效的正整数，"${total}"`
        );
    }

    return async <T = unknown>(
        payload: Promise<T>,
        isDoneOnce: boolean = false
    ): Promise<{
        done: boolean;
        value: Awaited<T>[] | undefined;
    }> => {
        if (isPromise(payload)) {
            promises.push(payload);
        }

        if (
            !isOverOnce &&
            ((isUndefined(total) && isDoneOnce) ||
                (isUint(total) && !(promises.length % total)))
        ) {
            return await Promise.all(promises).then(value => {
                if (!isRestart) {
                    isOverOnce = true;
                }

                if (!isAccumulate) {
                    promises.length = 0;
                }

                return { done: true, value };
            });
        }

        return { done: false, value: void 0 };
    };
}

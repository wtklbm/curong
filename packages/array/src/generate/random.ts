import { isArrayIndex, isZero } from '@curong/types';

import randomUint8 from '../../../string/src/random/constants/randomUint8';

import shuffle from '../convert/shuffle';

import mapToArray from './mapToArray';
import type { RandomOptions } from './types';

/**
 * 从数组中随机挑选一个元素
 *
 * @param value 要使用的数组
 * @param options 配置选项
 *  - `length`: 要返回的随机元素的个数，默认为 `1`
 *  - `isSafe`: 是否使用安全的 `random` 方法进行排序，默认为 `false`
 *    - `true`: 使用 `crypto.getRandomValues` 方法来生成随机数，运行速度慢，安全
 *    - `false`: 使用 `Math.random` 方法来生成随机数，运行速度快，不安全
 *  - `isRepeat`: 是否允许数组中出现重复的元素，默认为 `true`
 * @returns 返回随机挑选的元素
 * @example
 * ```typescript
 * const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
 * const ret = random(arr);
 * console.log(ret); // 'd'
 * ```
 */
export default function random<T>(
    value: T[],
    options: RandomOptions = {}
): T[] {
    const { length = 1, isSafe = false, isRepeat = true } = options;

    if (!isArrayIndex(length)) {
        throw new TypeError(`[random] length 必须为数组的下标索引`, {
            cause: { value, length }
        });
    }

    const len = value.length;

    if (isZero(len) || isZero(length)) {
        return [];
    }

    const maxLen = Math.min(len, length);

    if (isRepeat) {
        if (isSafe) {
            return randomUint8(maxLen).map(n => value[n % len]);
        }

        return mapToArray(maxLen, () => value[Math.floor(Math.random() * len)]);
    }

    return shuffle(value, isSafe).slice(0, maxLen);
}

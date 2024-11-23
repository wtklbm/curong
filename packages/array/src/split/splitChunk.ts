import { isEqual, isUintFilled, isUndefined, isZero } from '@curong/types';

import splitByStep from './splitByStep';

/**
 * 将一个数组按照指定的长度拆分为二维数组
 *
 * @param value 要处理的数组
 * @param length 二维数组的最小总长度，它是一个大于 `0` 的整数
 * @param padPosition 要将余下的元素添加到何处。默认会在二维数组添加一项来存储它
 *  - `start`: 按照前 `n` 个元素每一个元素添加一项的方式来平分多余的项
 *  - `end`: 按照后 `n` 个元素每一个元素添加一项的方式来平分多余的项
 * @returns 返回拆分好的二维数组。
 *  - 如果 `length` 大于或等于 `value.length`，则直接返回 `[value]`
 *  - 如果 `value.length / length` 有余数，且在不传递 `padPosition` 的情况下，默认的拆分长度是 `length + 1`
 * @throws
 *  - 如果 `length` 不是大于 `0` 的整数，则会抛出类型错误异常
 *  - 如果 `padPosition` 的值不是 `start` 或 `end`，则会抛出类型错误异常
 * @example
 *
 * ```typescript
 * const v = [1, 2, 3, 4, 5];
 * console.log(splitChunk(v, 2)); // [ [1, 2], [3, 4], [5] ]
 * console.log(splitChunk(v, 2, 'start')); // [ [1, 2, 3], [4, 5] ]
 * console.log(splitChunk(v, 2, 'end')); // [ [1, 2], [3, 4, 5] ]
 * ```
 */
export default function splitChunk<T>(
    value: T[],
    length: number,
    padPosition?: 'start' | 'end'
): T[][] {
    if (!isUintFilled(length)) {
        throw new TypeError('[splitChunk] length 不是一个大于 0 的整数', {
            cause: { value, length, padPosition }
        });
    }

    if (length >= value.length) {
        return [value];
    }

    const len = value.length;
    const d = len % length;
    const f = Math.floor(len / length);

    if (isZero(d) || isUndefined(padPosition)) {
        return splitByStep(value, f);
    }

    if (isEqual(padPosition, 'start')) {
        const n = d * f + d;
        const a = splitByStep(value.slice(0, n), f + 1);
        const b = splitByStep(value.slice(n), f);

        return a.concat(b);
    }

    if (isEqual(padPosition, 'end')) {
        const n = (length - d) * f;
        const a = splitByStep(value.slice(0, n), f);
        const b = splitByStep(value.slice(n), f + 1);

        return a.concat(b);
    }

    throw new TypeError('[splitChunk] padPosition 的值必须是 start 或 end', {
        cause: { value, length, padPosition }
    });
}

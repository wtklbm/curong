import { isUint } from '@curong/types';

/**
 * 将数组中的元素从一个位置移动到另一个位置
 *
 * @param value 目标数组，包含要操作的元素
 * @param from 要移动的元素的起始索引 (从 `0` 开始)
 * @param to 元素要移动到的目标位置 (从 `0` 开始)
 * @returns 返回一个新的数组，元素已按照给定的起始位置和目标位置进行移动
 * @throws 如果 `from` 或 `to` 的范围不在 `value` 的索引范围内，则会抛出异常
 * @example
 *
 * ```typescript
 * const result = move([1, 2, 3, 4], 1, 3);
 * console.log(result); // [1, 3, 4, 2]
 * ```
 */
export default function move<T>(value: T[], from: number, to: number): T[] {
    const len = value.length;

    if (len === 0) {
        return value;
    }

    const startIndex = from < 0 ? len + from : from;

    if (!isUint(startIndex) || startIndex < 0 || startIndex >= len) {
        throw new RangeError(`[move] form 不是一个合法的索引，${from}`);
    }

    const endIndex = to < 0 ? len + to : to;

    if (!isUint(endIndex) || endIndex < 0 || endIndex >= len) {
        throw new RangeError(`[move] to 不是一个合法的索引，${endIndex}`);
    }

    if (startIndex === endIndex) {
        return value;
    }

    const item = value[startIndex];
    const before = value.slice(0, startIndex);
    const after = value.slice(startIndex + 1);

    if (endIndex === len - 1) {
        return [...before, ...after, item];
    }

    return [
        ...before,
        ...after.slice(0, endIndex),
        item,
        ...after.slice(endIndex)
    ];
}

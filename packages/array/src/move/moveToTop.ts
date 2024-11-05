import { isInt, isZero } from '@curong/types';

/**
 * 将数组中的元素移动到数组的开头
 *
 * @param value 目标数组，包含要操作的元素
 * @param from 要移动的元素的起始索引 (从 `0` 开始)
 * @returns 返回一个新的数组，元素已按照给定的起始位置移动到数组的开头
 * @throws 如果 `from` 不在 `value` 的索引范围内，则会抛出异常
 * @example
 *
 * ```typescript
 * const result = moveToTop([1, 2, 3, 4], 2);
 * console.log(result); // [3, 1, 2, 4]
 * ```
 */
export default function moveToTop<T>(value: T[], from: number): T[] {
    value = value.slice();
    const len = value.length;

    if (isZero(len)) {
        return value;
    }

    from = from < 0 ? len + from : from;

    if (!isInt(from) || from < -len || from < 0 || from >= len) {
        throw new RangeError(`[moveToTop] from 不是 value 的索引，${from}`);
    }

    value.unshift(value.splice(from, 1)[0]);

    return value;
}

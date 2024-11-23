import { isInt, isZero } from '@curong/types';

/**
 * 将数组中的元素移动到数组的结尾
 *
 * @param value 目标数组，包含要操作的元素
 * @param from 要移动的元素的起始索引 (从 `0` 开始，可以为负整数)
 * @returns 返回一个新的数组，元素已按照给定的起始位置移动到数组的结尾
 * @throws 如果 `from` 不在 `value` 的索引范围内，则会抛出异常
 * @example
 *
 * ```typescript
 * const result = moveToBottom([1, 2, 3, 4], 1);
 * console.log(result); // [1, 3, 4, 2]
 * ```
 */
export default function moveToBottom<T>(value: T[], from: number): T[] {
    value = value.slice();
    const len = value.length;

    if (isZero(len)) {
        return value;
    }

    from = from < 0 ? len + from : from;

    if (!isInt(from) || from < -len || from < 0 || from >= len) {
        throw new TypeError('[moveToBottom] from 不是 value 的索引', {
            cause: { value, from }
        });
    }

    value.push(value.splice(from, 1)[0]);

    return value;
}

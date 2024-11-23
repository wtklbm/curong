import { isInt, isUint, isZero } from '@curong/types';

/**
 * 将数组中的元素向下移动指定的步数
 *
 * @param value 目标数组，包含要操作的元素
 * @param from 要移动的元素的起始索引 (从 `0` 开始，可以为负整数)
 * @param step 向后移动的步数，默认为 `1`
 * @returns 返回一个新的数组，元素已按照给定的起始位置和步数进行向后移动
 * @throws
 *  - 如果 `from` 不在 `value` 的索引范围内，则会抛出异常
 *  - 如果 `step` 不是无符号整数，则会抛出异常
 * @note 元素只能在 `value` 的索引范围内移动，如果移动到的目标位置大于 `value.length-1`，则不会产生任何效果
 * @example
 *
 * ```typescript
 * const result = moveDown([1, 2, 3, 4], 1);
 * console.log(result); // [1, 3, 2, 4]
 * ```
 */
export default function moveDown<T>(value: T[], from: number, step = 1): T[] {
    const len = value.length;

    if (isZero(len) || isZero(step)) {
        return value.slice();
    }

    from = from < 0 ? len + from : from;

    if (!isInt(from) || from < -len || from < 0 || from >= len) {
        throw new TypeError('[moveDown] from 不是 value 的索引', {
            cause: { value, from, step }
        });
    }

    if (!isUint(step)) {
        throw new TypeError('[moveDown] step 必须为无符号整数', {
            cause: { value, from, step }
        });
    }

    const indexToMove = Math.min(len, from + step);
    const after = value.slice(from + 1);

    return [
        ...value.slice(0, from),
        ...after.slice(0, indexToMove - from),
        value[from],
        ...after.slice(indexToMove - from)
    ];
}

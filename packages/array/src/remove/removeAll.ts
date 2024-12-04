import { isZero } from '@curong/types';

import { indexOfAll } from '../find';

/**
 * 从数组中移除所有匹配的元素
 *
 * 该函数查找 `array` 中所有等于 `value` 的元素，并将它们全部移除。
 * 该函数直接修改原数组。
 *
 * @param array 需要操作的数组
 * @param value 要移除的元素
 * @returns 如果成功移除至少一个匹配元素，则返回 `true`，否则返回 `false`
 * @example
 * ```typescript
 * const numbers = [1, 2, 3, 2, 4, 2];
 * console.log(removeAll(numbers, 2)); // true
 * console.log(numbers); // [1, 3, 4]
 *
 * const strings = ['a', 'b', 'a', 'c'];
 * console.log(removeAll(strings, 'a')); // true
 * console.log(strings); // ['b', 'c']
 *
 * const booleans = [true, false, true];
 * console.log(removeAll(booleans, false)); // true
 * console.log(booleans); // [true, true]
 *
 * const notFound = [1, 2, 3];
 * console.log(removeAll(notFound, 4)); // false
 * console.log(notFound); // [1, 2, 3]
 * ```
 * @note
 *  - 该函数使用 `indexOfAll` 查找所有匹配的索引，并从后向前移除元素，避免影响后续索引
 *  - 时间复杂度为 `O(n)`，其中 `n` 是数组的长度，查找和删除操作都会遍历数组
 *  - 如果 `array` 中不存在 `value`，函数不会修改数组并返回 `false`
 *  - 如果数组中包含多个相同的 `value`，所有匹配项都会被移除
 *  - 适用于需要删除数组中所有特定元素的场景，但要注意原数组会被修改
 */
export default function removeAll<T>(array: T[], value: T): boolean {
    if (isZero(array.length)) {
        return false;
    }

    const indexes = indexOfAll(array, value);
    const len = indexes.length;

    if (isZero(len)) {
        return false;
    }

    for (let i = len - 1; i >= 0; i--) {
        array.splice(indexes[i], 1);
    }

    return true;
}

import { isEqual, isZero } from '@curong/types';

/**
 * 查找数组中所有匹配元素的索引
 *
 * 该函数遍历 `array` 数组，查找所有等于 `value` 的元素，并返回它们的索引组成的数组。
 * 如果 `value` 在数组中出现多次，函数将返回所有匹配的索引。
 *
 * @param array 待查找的数组
 * @param value 要查找的值
 * @returns 返回一个包含所有匹配元素索引的数组。如果没有找到匹配项，返回空数组
 * @example
 * ```typescript
 * const numbers = [1, 2, 3, 4, 2, 5, 2];
 * console.log(indexOfAll(numbers, 2)); // [1, 4, 6]
 *
 * const strings = ['a', 'b', 'a', 'c'];
 * console.log(indexOfAll(strings, 'a')); // [0, 2]
 *
 * const booleans = [true, false, true, false];
 * console.log(indexOfAll(booleans, false)); // [1, 3]
 *
 * const emptyArray: number[] = [];
 * console.log(indexOfAll(emptyArray, 1)); // []
 * ```
 * @note
 *  - 该函数使用 `===` 严格相等进行比较，适用于基本类型的比较。如果数组中有复杂类型（如对象或数组），需要确保传入的 `value` 与数组中的元素严格相等
 *  - 时间复杂度为 `O(n)`，其中 `n` 是数组的长度，因为需要遍历整个数组
 *  - 如果数组中没有找到任何匹配项，返回一个空数组
 *  - 适用于查找数组中所有匹配元素的位置，常用于统计重复值的位置或验证元素分布
 */
export default function indexOfAll<T>(array: T[], value: T): number[] {
    const indices: number[] = [];
    const len = array.length;

    if (isZero(len)) {
        return indices;
    }

    for (let i = 0; i < len; i++) {
        if (isEqual(array[i], value)) {
            indices.push(i);
        }
    }

    return indices;
}

/**
 * 从数组中获取指定索引的元素
 *
 * @param array 一个只读数组
 * @param index 要获取元素的索引。如果索引为负数，将从数组末尾开始计算，
 *   例如，`-1` 表示最后一个元素，`-2` 表示倒数第二个元素
 * @returns 返回索引处的元素。如果索引超出范围，则返回 `undefined`
 * @example
 * ```typescript
 * const numbers = [10, 20, 30, 40];
 * console.log(get(numbers, 1)); // 20
 * console.log(get(numbers, -1)); // 40
 * console.log(get(numbers, 10)); // undefined
 *
 * const emptyArray: [] = [];
 * console.log(get(emptyArray, 0)); // undefined
 * ```
 * @overload
 * ```typescript
 * // 当数组为空时，函数返回 `undefined`
 * get(array: readonly [], index: number): undefined;
 *
 * // 当数组非空时，返回对应类型的元素
 * get<T>(array: readonly T[], index: number): T;
 * ```
 * @note
 *  - 当 `index` 为负数时，函数会自动将其转换为正索引
 *  - 如果索引超出数组边界，返回 `undefined`
 */
function get(array: readonly [], index: number): undefined;
function get<T>(array: readonly T[], index: number): T;
function get<T>(array: readonly T[] | [], index: number): T | undefined {
    const len = array.length;

    if (!len) {
        return;
    }

    if (index < 0) {
        index += len;
    }

    return array[index];
}

export default get;

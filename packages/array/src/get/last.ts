import get from './get';

/**
 * 获取数组中的最后一个元素
 *
 * @template T 数组元素的类型
 * @param array 一个数组
 * @returns 返回数组中的最后一个元素。如果数组为空，返回 `undefined`
 * @example
 * ```typescript
 * console.log(last([10, 20, 30, 40])); // 40
 * console.log(last(['a', 'b', 'c'])); // 'c'
 * console.log(last([])); // undefined
 * ```
 * @overload
 * ```typescript
 * // 当数组为空时，函数返回 `undefined`
 * last(array: []): undefined;
 *
 * // 当数组非空时，返回对应类型的最后一个元素
 * last<T>(array: T[]): T;
 * ```
 * @note
 *  - 如果数组为空，则返回 `undefined`
 *  - 该函数是 `get(array, -1)` 的简化版本
 */
function last(array: []): undefined;
function last<T>(array: T[]): T;
function last<T>(array: T[]): T | undefined {
    return get(array, -1);
}

export default last;

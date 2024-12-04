/**
 * 根据自定义比较函数移除数组中的重复元素
 *
 * 该函数接收一个数组 `array` 和一个自定义比较函数 `equalFn`，通过逐个元素比较来移除重复项，
 * 并返回一个包含唯一元素的新数组。适用于无法使用简单值比较的复杂数据结构去重。
 *
 * @template T 数组元素的类型
 * @param array 待处理的数组
 * @param equalFn 自定义比较函数，接受两个参数，当前值 `value` 和已重复的值 `duplicated`，返回一个布尔值，`true` 表示两个元素相等
 * @returns 返回一个经过去重处理的新数组
 * @example
 * ```typescript
 * const objects = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' },
 *   { id: 1, name: 'Alice' },
 * ];
 *
 * const uniqueObjects = uniqueBy(objects, (a, b) => a.id === b.id);
 * console.log(uniqueObjects); // [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
 *
 * const numbers = [1, 2, 2, 3, 1, 4];
 * const uniqueNumbers = uniqueBy(numbers, (a, b) => a === b);
 * console.log(uniqueNumbers); // [1, 2, 3, 4]
 *
 * const caseInsensitiveStrings = ['a', 'A', 'b', 'B', 'a'];
 * const uniqueStrings = uniqueBy(caseInsensitiveStrings, (a, b) => a.toLowerCase() === b.toLowerCase());
 * console.log(uniqueStrings); // ['a', 'b']
 * ```
 * @note
 *  - 时间复杂度为 `O(n^2)`，其中 `n` 是数组的长度，因为每个元素都会与前面已经处理过的元素进行比较
 *  - 先判断的元素比后判断的元素的优先级高，元素的前后顺序导致返回的结果也不尽相同
 *  - 如果数组较大，可能会有性能问题，建议优化比较逻辑或考虑其他数据结构
 *  - 函数不会修改原始数组，而是返回一个新数组
 *  - 适用于无法通过简单相等比较去重的场景，特别是对象数组或需要自定义相等逻辑的数据
 */
export default function uniqueBy<T>(
    array: readonly T[],
    equalFn: (value: T, duplicated: T) => boolean
): T[] {
    const seen = new Set<T>();

    return array.filter(value => {
        for (const key of seen.keys()) {
            if (equalFn(value, key)) {
                return false;
            }
        }
        seen.add(value);
        return true;
    });
}

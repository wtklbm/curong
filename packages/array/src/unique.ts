/**
 * 去除数组中的重复元素
 *
 * @param values 需要去重的数组
 * @returns 返回一个去除重复元素的新数组
 * @example
 *
 * ```javascript
 * console.log(unique([1, 2, 3, 2, 1])); // [1, 2, 3]
 * console.log(unique(['apple', 'banana', 'apple', 'orange', 'banana'])); // ['apple', 'banana', 'orange']
 * ```
 */
export default function unique<T>(values: T[]): T[] {
    return Array.from(new Set(values));
}

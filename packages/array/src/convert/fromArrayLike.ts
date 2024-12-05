/**
 * 将一个类数组转换为数组
 *
 * @param value 类数组
 * @returns 返回转换后的数组
 * @example
 * ```js
 * const print = function () {
 *     const args = fromArrayLike(arguments);
 *
 *     console.log(args); // [ 1, 32, 43, 54, 2, 32 ]
 * };
 *
 * print(1, 32, 43, 54, 2, 32);
 * ```
 */
export default function fromArrayLike<T>(value: ArrayLike<T>): T[] {
    return Array.prototype.slice.call(value);
}

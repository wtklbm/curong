/**
 * 将给定的数组转换为一个普通对象
 *
 * @param array 需要转换的数组
 * @param makeKey 用于生成对象的键的函数。接收数组中的每个元素，并返回一个字符串作为键
 * @param makeValue 用于生成对象的值的函数。接收数组中的每个元素，并返回一个值
 * @returns 返回一个对象，其中键为 `makeKey` 函数生成的键，值为 `makeValue` 函数生成的值
 * @example
 *
 * ```typescript
 * const array = [
 *     { id: 1, name: 'Alice' },
 *     { id: 2, name: 'Bob' }
 * ];
 *
 * const obj = toObject(
 *     array,
 *     item => item.id.toString(),
 *     item => item.name
 * );
 *
 * console.log(obj); // { '1': 'Alice', '2': 'Bob' }
 * ```
 */
export default function toObject<T, U>(
    array: ReadonlyArray<T>,
    makeKey: (value: T) => string,
    makeValue: (value: T) => U
): Record<string, U> {
    const result: Record<string, U> = {};

    for (const value of array) {
        result[makeKey(value)] = makeValue(value);
    }

    return result;
}

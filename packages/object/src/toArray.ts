import { keys } from './keys';

/**
 * 将一个普通对象的键值对转换为数组
 *
 * `toArray` 函数会遍历对象的所有键，并将键值对通过 `converter` 转换函数转换为数组元素，最后返回包含这些元素的数组
 *
 * @param object 要转换的对象
 * @param converter 用于转换键值对的函数，通过提供自定义的转换器函数，可以控制数组中每个元素的结构。默认为 `(key, value) => [key, value]`
 * @param methodLevel 通过什么方法来获取属性
 *  - `0`: `Object.keys`: 只包含可枚举属性 (默认值)
 *  - `1`: `Object.getOwnPropertyNames`: 只包含可枚举属性和不可枚举属性
 *  - `2`: `Object.getOwnPropertySymbols`: 只包含 `Symbol` 属性
 *  - `3`: `Reflect.ownKeys`: 包含可枚举属性、不可枚举属性、`Symbol` 属性
 * @returns 包含转换后的数组
 * @example
 *
 * ```typescript
 * const obj = { a: 1, b: 2, c: 3 };
 * const array = toArray(obj);
 * console.log(array); // [['a', 1], ['b', 2], ['c', 3]]
 *
 * const customArray = toArray(obj, (key, value) => ({ key, value }));
 * console.log(customArray); // [{ key: 'a', value: 1 }, { key: 'b', value: 2 }, { key: 'c', value: 3 }]
 * ```
 */

export default function toArray<R, K extends PropertyKey, V>(
    object: Record<K, V>,
    converter: (key: K, value: V) => R = (k, v) => [k, v] as R,
    methodLevel: 0 | 1 | 2 | 3 = 0
): R[] {
    return keys(object, methodLevel).reduce((memo, k) => {
        return memo.push(converter(k, object[k])), memo;
    }, [] as R[]);
}

import { ObjectType } from './types';

const fns = [
    Object.keys,
    Object.getOwnPropertyNames,
    Object.getOwnPropertySymbols,
    Reflect.ownKeys
];

/**
 * 检查指定的键是否存在于给定的对象或类数组对象中
 *
 * @param object 要搜索键的对象或类数组对象
 * @param key 要搜索的键或键的数组
 * @param methodLevel 通过什么方法来获取属性
 *  - `0`: `Object.keys`: 只包含可枚举属性 (默认值)
 *  - `1`: `Object.getOwnPropertyNames`: 只包含可枚举属性和不可枚举属性
 *  - `2`: `Object.getOwnPropertySymbols`: 只包含 `Symbol` 属性
 *  - `3`: `Reflect.ownKeys`: 包含可枚举属性、不可枚举属性、`Symbol` 属性
 * @param useAny 如何根据 `key` 数组中的元素来决定函数的返回值
 *  - `true`: 一旦找到匹配项时，该函数就会返回 `true`
 *  - `false`: 仅当所有值都匹配时，该函数才会返回 `true` (默认值)
 * @returns 如果在对象中找到该键（或数组中的所有键），则返回 `true`，否则返回 `false`
 * @example
 *
 * ```javascript
 * const obj = { a: 1, b: 2, c: 3 };
 * console.log(isKeysIncludes(obj, 'c')); // true
 * console.log(isKeysIncludes(obj, ['b', 'd'])); // false
 * console.log(isKeysIncludes(obj, ['b', 'd'], 0, true)); // true
 * ```
 */
export default function isKeysIncludes(
    object: ObjectType<unknown> | ArrayLike<unknown>,
    key: PropertyKey | PropertyKey[],
    methodLevel: number = 0,
    useAny: boolean = false
): boolean {
    const keys = new Set(fns[methodLevel](object));
    return [key].flat()[useAny ? 'some' : 'every']((k: any) => keys.has(k));
}
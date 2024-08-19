import { isUint } from '@curong/types';

import type { ObjectType } from '../types';

const fns = [
    Object.keys,
    Object.getOwnPropertyNames,
    Object.getOwnPropertySymbols,
    Reflect.ownKeys
];

/**
 * 从给定的对象或类数组对象中获取所有的键
 *
 * @param object 要操作的对象或类数组对象
 * @param methodLevel 通过什么方法来获取属性
 *  - `0`: `Object.keys`: 只包含可枚举属性 (默认值)
 *  - `1`: `Object.getOwnPropertyNames`: 只包含可枚举属性和不可枚举属性
 *  - `2`: `Object.getOwnPropertySymbols`: 只包含 `Symbol` 属性
 *  - `3`: `Reflect.ownKeys`: 包含可枚举属性、不可枚举属性、`Symbol` 属性
 * @returns 返回一个键数组
 * @throws 如果 `methodLevel` 的值不是 `0` 到 `3` 的整数，则会抛出类型错误
 * @example
 *
 * ```typescript
 * const obj = { a: 1, [Symbol('2')]: '2' };
 * console.log(keys(obj)); // [ 'a' ]
 * console.log(keys(obj, 3)); // [ 'a', Symbol(2) ]
 * ```
 */
export default function keys(
    object: ObjectType<unknown> | ArrayLike<unknown>,
    methodLevel: 0 | 1 | 2 | 3 = 0
): PropertyKey[] {
    if (
        isUint(methodLevel) &&
        methodLevel >= Math.min(0, 3) &&
        methodLevel <= Math.max(0, 3)
    ) {
        return fns[methodLevel](object);
    }

    throw new TypeError(
        `[keys] methodLevel 的值只能是 0 到 3，当前为 ${methodLevel}`
    );
}

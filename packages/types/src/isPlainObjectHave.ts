import { keysFns } from './constants/object';
import isPlainObject from './isPlainObject';

/**
 * 是不是一个属性个数大于 `0` 的普通对象，即 `{}`
 *
 * @param value 要验证的值
 * @param methodLevel 通过什么方法来判断属性个数
 *  - `0`: `Object.keys`: 只包含可枚举属性 (默认值)
 *  - `1`: `Object.getOwnPropertyNames`: 只包含可枚举属性和不可枚举属性
 *  - `2`: `Object.getOwnPropertySymbols`: 只包含 `Symbol` 属性
 *  - `3`: `Reflect.ownKeys`: 包含可枚举属性、不可枚举属性、`Symbol` 属性
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isPlainObjectHave<K extends keyof any, T = unknown>(
    value: any,
    methodLevel: 0 | 1 | 2 | 3 = 0
): value is Record<K, T> {
    return isPlainObject(value) && keysFns[methodLevel](value).length > 0;
}

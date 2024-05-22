import isObject from './isObject';

const fns = [
    Object.keys,
    Object.getOwnPropertyNames,
    Object.getOwnPropertySymbols,
    Reflect.ownKeys
];

/**
 * 是不是一个属性个数大于 `0` 的对象
 *
 * @param value 要验证的值
 * @param methodLevel 通过什么方法来判断属性个数
 *  - `0`: `Object.keys` (默认值)
 *  - `1`: `Object.getOwnPropertyNames`
 *  - `2`: `Object.getOwnPropertySymbols`
 *  - `3`: `Reflect.ownKeys`
 *
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isObjectHave<K extends keyof any, T = unknown>(
    value: any,
    methodLevel: 0 | 1 | 2 | 3 = 0
): value is Record<K, T> {
    return isObject(value) && fns[methodLevel](value).length > 0;
}

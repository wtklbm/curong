import isObject from './isObject';

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
export default function isObjectHave<K extends keyof any, T = any>(
    value: any,
    methodLevel: 0 | 1 | 2 | 3 = 0
): value is Record<K, T> {
    const f =
        methodLevel === 0
            ? Object.keys
            : methodLevel === 1
            ? Object.getOwnPropertyNames
            : methodLevel === 2
            ? Object.getOwnPropertySymbols
            : Reflect.ownKeys;

    return isObject(value) && f(value).length > 0;
}

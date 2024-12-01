import { isPlainObjectFilled } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个属性个数大于 `0` 的普通对象，即 `{}`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @param methodLevel 通过什么方法来判断属性个数
 *  - `0`: `Object.keys`: 只包含可枚举属性 (默认值)
 *  - `1`: `Object.getOwnPropertyNames`: 只包含可枚举属性和不可枚举属性
 *  - `2`: `Object.getOwnPropertySymbols`: 只包含 `Symbol` 属性
 *  - `3`: `Reflect.ownKeys`: 包含可枚举属性、不可枚举属性、`Symbol` 属性
 * @throws 如果不是则会抛出类型异常
 */
export default function assertPlainObjectFilled<
    K extends PropertyKey,
    V = unknown
>(
    value: unknown,
    variableName: string,
    methodLevel: 0 | 1 | 2 | 3 = 0
): asserts value is Record<K, V> {
    return typeGuard(
        { [variableName]: value },
        '不是一个属性个数大于 0 的普通对象，即 {}',
        isPlainObjectFilled,
        methodLevel
    );
}

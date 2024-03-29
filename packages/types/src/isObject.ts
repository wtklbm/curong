import getTag from './getTag';

/**
 * 是不是一个类型标记为 `[object Object]` 的对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @info
 *  - 该方法通过 `Object.prototype.toString.call(value)` 来验证是否等于 `[object Object]`
 *  - 如果想验证普通对象，请使用 `isPlainObject` 方法
 *  - 如果想使用 `typeof` 验证一个对象，请使用 `isTypeofObject` 方法
 *  - 判断一个类的实例 (`class xxx {}`)，所得到的结果是 `true`
 */
export default function isObject<K extends keyof any, T = unknown>(
    value: any
): value is Record<K, T> {
    return getTag(value) === 'Object';
}

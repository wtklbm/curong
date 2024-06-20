import isObject from './isObject';

/**
 * 是不是一个纯对象，即通过 `Object.create(null)` 创建的对象，该对象的原型就是 `null`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @note
 *
 * - 如果想验证任意的对象，请使用 `isObject` 方法
 * - 如果想使用 `typeof` 验证一个对象，请使用 `isTypeofObject` 方法
 * - 如果想验证普通对象，请使用 `isPlainObject` 方法
 */
export default function isPureObject<K extends keyof any, T = unknown>(
    value: any
): value is Record<K, T> {
    return (
        isObject(value) &&
        value.constructor === undefined &&
        Object.getPrototypeOf(value) === null &&
        !(Symbol.toStringTag in value) &&
        !(Symbol.iterator in value)
    );
}

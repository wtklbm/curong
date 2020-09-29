import isObject from './isObject';

/**
 * 是不是一个普通对象，即 `{}`，该对象的原型指向 `Object.prototype`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @info 如果想验证任意的对象，请使用 `isObject` 方法。
 * 如果想使用 `typeof` 验证一个对象，请使用 `isTypeofObject` 方法。
 */
export default function isPlainObject(
    value: any
): value is { [key: string]: any } {
    return (
        isObject(value) &&
        value.constructor === Object &&
        Object.getPrototypeOf(value) === Object.prototype
    );
}

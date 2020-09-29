import isObject from './isObject';

/**
 * 是不是 `T` 类型的任意对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isObjectLike<T extends object>(value: any): value is T {
    return isObject(value);
}

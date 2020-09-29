import isPlainObject from './isPlainObject';

/**
 * 是不是一个属性个数大于 `0` 的普通对象，即 `{}`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isPlainObjectHave(
    value: any
): value is { [key: string]: any } {
    return isPlainObject(value) && Object.keys(value).length > 0;
}

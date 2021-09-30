import isPlainObject from './isPlainObject';

/**
 * 是不是一个属性个数大于 `0` 的普通对象，即 `{}`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isPlainObjectHave<K extends keyof any, T = any>(
    value: any
): value is Record<K, T> {
    return isPlainObject(value) && Object.keys(value).length > 0;
}

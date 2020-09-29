import isObject from './isObject';

/**
 * 是不是一个属性个数大于 `0` 的对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isObjectHave(
    value: any
): value is { [key: string]: any } {
    return isObject(value) && Object.keys(value).length > 0;
}

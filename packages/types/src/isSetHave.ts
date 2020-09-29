import isSet from './isSet';

/**
 * 是不是一个长度大于 `0` 的 `Set`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isSetHave(value: any): value is Set<any> {
    return isSet(value) && value.size > 0;
}

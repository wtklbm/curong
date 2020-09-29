import isMap from './isMap';

/**
 * 是不是一个长度大于 `0` 的 `Map`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isMapHave(value: any): value is Map<any, any> {
    return isMap(value) && value.size > 0;
}

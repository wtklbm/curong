import isNull from './isNull';
import isUndefined from './isUndefined';

/**
 * 是不是 `undefined` 或者 `null`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isNullOrUndefined(value: any): value is void {
    return isNull(value) || isUndefined(value);
}

import isArray from './isArray';
import isArrayIndex from './isArrayIndex';
import isFunction from './isFunction';
import isNullOrUndefined from './isNullOrUndefined';
import isWindow from './isWindow';

/**
 * 是不是一个类数组
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 *
 * ```javascript
 * console.log(isArrayLike([])); // false
 *
 * const fn = function (a: number) {
 *     console.log(isArrayLike(arguments)); // true
 * }(0);
 * ```
 */
export default function isArrayLike<T = any>(
    value: any
): value is ArrayLike<T> {
    if (
        isNullOrUndefined(value) ||
        isArray(value) ||
        isFunction(value) ||
        isWindow(value)
    ) {
        return false;
    }

    const l = value.length;

    return l === 0 || (isArrayIndex(l) && value[l - 1] in value);
}

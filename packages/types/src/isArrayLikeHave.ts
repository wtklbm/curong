import isArrayLike from './isArrayLike';

/**
 * 是不是一个长度大于 `0` 的类数组 (不包含数组)
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isArrayLikeHave<T = any>(
    value: any
): value is ArrayLike<T> {
    return isArrayLike(value) && value.length > 0;
}

import isArray from './isArray';
import isUndefined from './isUndefined';

/**
 * 是不是一个数组，且每一项的值都是 `undefined`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isUndefinedArray(value: unknown): value is undefined[] {
    return isArray(value) && value.every(isUndefined);
}

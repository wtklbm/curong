import isArray from './isArray';

/**
 * 是不是一个多维数组 (至少是二维)
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isArrayDimensional(value: unknown): boolean {
    return isArray(value) && value.length > 0 && isArray(value[0]);
}

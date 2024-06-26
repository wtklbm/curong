import isArray from './isArray';
import isArrayFilled from './isArrayFilled';

/**
 * 是不是一个长度大于 `0` 的数组，且每一项的值都是数组 (二维数组)
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @note
 *
 * 需要注意的是: 通过该方法判断三维也会返回 `true`，这是因为三维数组包含二维数组。
 * 如果想严格判断是否为指定维度的数组，请使用 `@curong/array` 中的 `isMultiDimensional` 方法。
 * 如果想具体判断数组的维数，请使用 `@curong/array` 中的 `dimensionLevel` 方法。
 */
export default function isArrayTwoDimensional<T extends unknown[][]>(
    value: unknown
): value is T {
    return isArrayFilled(value) && value.every(isArray);
}

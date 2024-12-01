import { isArrayTwoDimensional } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个长度大于 `0` 的数组，且每一项的值都是数组 (二维数组)
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 * @note
 *
 * 需要注意的是: 通过该方法判断三维也会返回 `true`，这是因为三维数组包含二维数组。
 * 如果想严格判断是否为指定维度的数组，请使用 `@curong/array` 中的 `isMultiDimensional` 方法。
 * 如果想具体判断数组的维数，请使用 `@curong/array` 中的 `dimensionLevel` 方法。
 */
export default function assertArrayTwoDimensional<T extends unknown[][]>(
    value: unknown,
    variableName: string
): asserts value is T {
    return typeGuard(
        { [variableName]: value },
        '不是一个长度大于 0 的数组，且每一项的值都是数组 (二维数组)',
        isArrayTwoDimensional
    );
}

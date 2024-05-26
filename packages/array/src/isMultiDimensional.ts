import { isArray, isArrayHave, isUint } from '@curong/types';

const handle = (dimension: unknown, strictly: boolean, level: number) => {
    return (
        // 检查 `level` 是否大于 `1`，如果不大于 `1` 则返回 `false`
        level > 1 &&
        // 如果 `dimension` 没传值，直接返回 `true`，否则根据 `strictly` 的值进一步检查
        (!dimension || (strictly ? level === dimension : level >= dimension))
    );
};

/**
 * 判断给定的数组是否为指定维度的多维数组 (至少是二维)
 *
 * @param value 要验证的值
 * @param dimension 一个大于 1 的正整数，表示该数组是否至少包含指定的维度
 * @param strictly 是否与传递的 `dimension` 的值严格相等，也就是说: 该数组就是指定维度的数组 (是相等关系而非包含关系)。默认为 `false`
 * @returns 是则返回 `true`，否则为 `false`
 * @throws 如果传递的 `dimension` 值不是大于 1 的正整数，则会抛出类型错误
 * @example
 *
 * ```javascript
 * console.log(isMultiDimensional([1])); // false
 * console.log(isMultiDimensional([[1], [2]], 2, true)); // true
 * console.log(isMultiDimensional([[[1]], [[2]]], 2)); // true
 * console.log(isMultiDimensional([[[1]], [[2]]], 3)); // true
 * ```
 */
export default function isMultiDimensional<T extends unknown[][]>(
    value: unknown,
    dimension?: number,
    strictly: boolean = false
): value is T {
    let level = 1;
    let internal = value;

    if (dimension && (!isUint(dimension) || dimension < 2)) {
        throw new TypeError(
            `[isMultiDimensional] level 不是一个有效的大于 1 的正整数: ${dimension}`
        );
    }

    while (isArrayHave(internal)) {
        if (!internal.every(isArray)) {
            return handle(dimension, strictly, level);
        }

        internal = internal.flat();
        level++;
    }

    return handle(dimension, strictly, level);
}

import { isArrayFilled } from '@curong/types';

/**
 * 判断一个数组的维度
 *
 * @param value 要检查的数组
 * @returns 返回数组的维度数字
 * @example
 *
 * ```typescript
 * console.log(dimensionLevel([1, 2, 3])); // 1
 * console.log(dimensionLevel([[1, 2], [3, 4]])); // 2
 * console.log(dimensionLevel([[[1, 2]], [[3, 4]]])); // 3
 * ```
 */
export default function dimensionLevel<T extends unknown[]>(value: T): number {
    let level = 1;
    let internal: unknown[] = value;

    while (isArrayFilled(internal)) {
        if (!internal.every(Array.isArray)) {
            return level;
        }

        internal = internal.flat();
        level++;
    }

    return level;
}

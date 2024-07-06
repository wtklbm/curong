import { isArray } from '@curong/types';

/**
 * 展平一个多维数组
 *
 * @param value 多维数组
 * @returns 返回一个一位数组
 * @example
 *
 * ```typescript
 * const ret = flat([1, [[2], 3], 4]);
 * console.log(ret); // [ 1, 2, 3, 4 ]
 * ```
 */
export default function flat<T>(value: T[]): T[] {
    return value.reduce<T[]>(
        (a, b) => a.concat(isArray(b) ? (flat(b) as T[]) : b),
        []
    );
}

import { isArray } from '@curong/types';

/**
 * 展平一个多维数组
 *
 * @param args 一个或多个数组
 * @returns 返回一个一维数组
 * @example
 * ```typescript
 * const ret = flat([1, [[2], 3], 4]);
 * console.log(ret); // [ 1, 2, 3, 4 ]
 * ```
 */
export default function flat<T>(...args: (T | T[])[]): T[] {
    return args.reduce<T[]>(
        (a, b) => a.concat(isArray(b) ? flat(...b) : b),
        []
    );
}

import maxRecursionDepth from './maxRecursionDepth';

/**
 * 是不是一个多维数组 (至少是二维)
 *
 * @param value 要验证的值
 * @param equalDepth 是不是指定深度的数组
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isDimensionalArray<T>(value: unknown[]): value is T[][] {
    return maxRecursionDepth(value) > 1;
}

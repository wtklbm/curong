/**
 * 计算数组的最大递归深度 (即数组中包含数组)
 *
 * @param value 要计算的数组
 * @returns 返回数组的最大递归深度
 */
export default function maxRecursionDepth<T extends any[]>(value: T): number {
    if (!Array.isArray(value)) {
        return 0;
    }

    if (value.length === 0) {
        return 1;
    }

    return Math.max.apply(
        null,
        value.reduce((m, v) => m.concat(maxRecursionDepth(v) + 1), [])
    );
}

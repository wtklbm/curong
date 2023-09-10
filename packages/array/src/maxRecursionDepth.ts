const _depth = (arr: any[], level: number) => {
    let maxDepth = 0;

    arr.forEach((item: any) => {
        maxDepth = Math.max(
            Array.isArray(item) ? _depth(item, level + 1) : level,
            maxDepth
        );
    });

    return maxDepth;
};

/**
 * 计算数组的最大递归深度 (即数组中包含数组)
 *
 * @param value 要计算的数组
 * @param empty 是否将空数组计算在内，默认为 `true`
 * @returns 返回数组的最大递归深度
 */
export default function maxRecursionDepth<T extends any[]>(
    value: T,
    empty: boolean = true
): number {
    if (!Array.isArray(value)) {
        return 0;
    }

    if (!empty) {
        return _depth(value, 1);
    }

    if (value.length === 0) {
        return 1;
    }

    return Math.max.apply(
        null,
        value.reduce((m, v) => m.concat(maxRecursionDepth(v) + 1), [])
    );
}

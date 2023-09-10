import { isArray, isArrayHave, isUintHave } from '@curong/types';

/**
 * 是不是一个多维数组 (至少是二维)
 *
 * @param value 要验证的值
 * @param level 是不是指定深度的数组
 * @returns 是则返回 `true`，否则为 `false`
 * @throw 如果传递的 `level` 值不是大于 0 的正整数，则会抛出类型错误
 * @example
 *
 * ```javascript
 * isMultiDimensional([[]]); // true
 * isMultiDimensional([[]], 2); // true
 * isMultiDimensional([[], 1]); // false
 * isMultiDimensional([[[], 1]], 2); // true
 * ```
 */
export default function isMultiDimensional<T>(
    value: unknown[],
    level?: number
): value is T[][] {
    if (level && !isUintHave(level)) {
        throw new TypeError(
            `[isMultiDimensional] level 不是一个有效的大于 0 的正整数: ${level}`
        );
    }

    if (!isArrayHave(value) || !value.every(isArray)) {
        return false;
    }

    let depthTotal = 2;

    const nestedLoop = (arr: any[], depth: number): boolean => {
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];

            if (isArray(item) && item.every(isArray)) {
                return nestedLoop(item, item.length === 0 ? depth : depth + 1);
            }
        }

        depthTotal = depth;

        return arr.every(isArray);
    };

    const ret = nestedLoop(value, depthTotal);

    return level ? ret && level === depthTotal : ret;
}

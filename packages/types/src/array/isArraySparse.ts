import hasOwnProperty from '../property/hasOwnProperty';

import isArray from './isArray';

/**
 * 是不是一个稀疏数组 (不包含稀疏的类数组)
 *
 * 稀疏数组是指数组中存在未定义的元素（即某些索引没有自己的属性）。
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 *
 * ```typescript
 * const arr1 = [1, 2, , 4]; // 稀疏数组
 * const arr2 = [1, 2, 3, 4]; // 非稀疏数组
 *
 * console.log(isArraySparse(arr1)); // true
 * console.log(isArraySparse(arr2)); // false
 * ```
 */
export default function isArraySparse<T>(value: unknown): value is Array<T> {
    if (!isArray(value)) {
        return false;
    }

    for (let i = 0, l = value.length; i < l; i++) {
        if (!hasOwnProperty(value, i)) {
            return true;
        }
    }

    return false;
}

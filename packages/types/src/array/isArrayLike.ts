import isWindow from '../element/isWindow';
import isTypeofObject from '../object/isTypeofObject';
import hasOwnProperty from '../property/hasOwnProperty';

import isArray from './isArray';
import isArrayIndex from './isArrayIndex';

/**
 * 是不是一个类数组 (包括稀疏的类数组，不包含数组和稀疏数组)
 *
 * @param value 要验证的值
 * @param similarity 类数组的相似程度，默认值为 `0`
 *  - `0`: 粗略判断，只要元素的 `length` 属性是数组的合法索引即可
 *  - `1`: 在保证 `length` 符合要求的情况下，判断数字 `key` 的个数是否与 `length` 相同
 *  - `2`: 不仅数字 `key` 的个数与 `length` 相同，还要保证对象的可枚举的属性的总个数是 `length` 加一
 * @param isSparse 当值为稀疏的类数组时是否返回 `true`。默认为 `true`。仅在 `similarity` 为 `1` 或 `2` 时有效
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 *
 * ```typescript
 * console.log(isArrayLike([])); // false
 *
 * const fn = function (a: number) {
 *     console.log(isArrayLike(arguments)); // true
 * }(0);
 * ```
 *
 * @note
 *
 * - 数组/类数组、字符串、函数、对象、`Window`、`Buffer`/`ArrayBuffer` 等都有 `length` 属性
 */
export default function isArrayLike<T = unknown>(
    value: unknown,
    similarity: 0 | 1 | 2 = 0,
    isSparse: boolean = true
): value is ArrayLike<T> {
    if (!isTypeofObject(value) || isArray(value) || isWindow(value)) {
        return false;
    }

    const l = value.length;

    if (!isArrayIndex(l)) {
        return false;
    }

    if (similarity <= 0) {
        return true;
    }

    const keys = Object.keys(value);
    const nkl = keys.map(Number).filter(isArrayIndex).length;

    if (!isSparse) {
        for (let i = 0, len = nkl; i < len; i++) {
            if (!hasOwnProperty(value, i)) {
                return false;
            }
        }
    }

    // 确保数字 `key` 的个数与 `length` 相同
    if (nkl !== l) {
        return false;
    }

    if (similarity === 1) {
        return true;
    }

    return keys.length === l + 1;
}

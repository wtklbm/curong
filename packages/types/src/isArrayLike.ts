import isArray from './isArray';
import isArrayIndex from './isArrayIndex';
import isTypeofObject from './isTypeofObject';
import isWindow from './isWindow';

/**
 * 是不是一个类数组 (不包含数组)
 *
 * @param value 要验证的值
 * @param similarity 类数组的相似程度，默认值为 `0`
 *
 *  - `0`: 粗略判断，只要 `length` 属性符合要求即可
 *  - `1`: 在保证 `length` 符合要求的情况下，判断对象中可枚举的属性是否存在
 *  - `2`: 不仅属性存在，还要保证对象的可枚举的属性的个数是 `length` 的个数加一
 *
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 *
 * ```javascript
 * console.log(isArrayLike([])); // false
 *
 * const fn = function (a: number) {
 *     console.log(isArrayLike(arguments)); // true
 * }(0);
 * ```
 */
export default function isArrayLike<T = any>(
    value: any,
    similarity: 0 | 1 | 2 = 0
): value is ArrayLike<T> {
    let ret = false;

    if (!isTypeofObject(value) || isArray(value) || isWindow(value)) {
        return ret;
    }

    // Note: 数组/类数组、字符串、函数、对象、`Window`、`Buffer`/`ArrayBuffer` 等都有 `length` 属性
    const l = value.length;

    if (!isArrayIndex(l)) {
        return ret;
    }

    ret = true;

    if (similarity <= 0) {
        return ret;
    }

    for (let i = 0; i < l; i++) {
        if (!(i in value)) {
            ret = false;
        }
    }

    if (similarity === 1) {
        return ret;
    }

    return ret && Object.keys(value).length === l + 1;
}

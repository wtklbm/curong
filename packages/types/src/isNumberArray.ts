import isArrayHave from './isArrayHave';
import isNumber from './isNumber';

/**
 * 是不是一个长度大于 0 的数组，且每一项的值都是数字或被包装后的数字对象
 *
 * @param value 要验证的值
 * @param isNaN 当某一项的值为 `NaN` 时是否返回 `true`，默认为 `false`
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isNumberArray(
    value: unknown,
    isNaN: boolean = false
): value is number[] {
    return isArrayHave(value) && value.every(v => isNumber(v, isNaN));
}

import isArrayHave from './isArrayHave';
import isNumber from './isNumber';

/**
 * 是不是一个长度大于 0 的数组，且每一项的值都是数字或被包装后的数字对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isNumberArray(value: unknown): value is number[] {
    return isArrayHave(value) && value.every(isNumber);
}

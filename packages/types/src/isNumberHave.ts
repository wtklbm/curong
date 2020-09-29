import isNumber from './isNumber';

/**
 * 是不是一个大于 `0` 并且小于或等于 `Number.MAX_VALUE` 的数字
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isNumberHave(value: any): value is number {
    return isNumber(value) && value > 0 && value <= Number.MAX_VALUE;
}

import isNumber from './isNumber';

/**
 * 是不是一个安全的数字，该数字不能为 `NaN` ，并且介于 `MAX_VALUE` 和 `-MAX_VALUE` 之间
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isNumberSafe(value: unknown): value is number {
    return (
        isNumber(value) &&
        !isNaN(value) &&
        value <= Number.MAX_VALUE &&
        value >= -Number.MAX_VALUE
    );
}

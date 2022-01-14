import isNumber from './isNumber';
import isString from './isString';

/**
 * 是不是一个不是 `NaN` 的数字或数字字符串
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @info 字符串 `Infinity` 和 `-Infinity` 的结果为 `true`
 */
export default function isNumeric(value: unknown): value is string | number {
    return (
        (isNumber(value) && !Number.isNaN(value)) ||
        (isString(value) && !isNaN(value as any))
    );
}

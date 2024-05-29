import isStringHave from './isStringHave';

/**
 * 是不是一个转换为 `Number` 后不是 `NaN` 的数字字符串
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @info 字符串 `Infinity` 和 `-Infinity` 的结果为 `true`
 */
export default function isNumericString(value: unknown): value is `${number}` {
    try {
        return isStringHave(value) && !isNaN(value as any);
    } catch {}

    return false;
}

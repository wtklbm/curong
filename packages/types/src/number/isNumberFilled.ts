import isFinite from './isFinite';

/**
 * 是不是一个不是 `0`、`Infinity`、`-Infinity` 或 `NaN` 的数字
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isNumberFilled(value: unknown): value is number {
    return isFinite(value) && value !== 0;
}

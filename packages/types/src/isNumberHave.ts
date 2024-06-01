import isFinite from './isFinite';

/**
 * 是不是一个不是 `0` 、`Infinity`、`-Infinity` 或 `NaN` 的数字
 *
 * 该方法是 `isNumberPositive` 的别名。
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isNumberHave(value: unknown): value is number {
    return isFinite(value) && value !== 0;
}

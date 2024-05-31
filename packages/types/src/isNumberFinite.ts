/**
 * 是不是一个不是 `Infinity`、`-Infinity` 或 `NaN` 的有限数
 *
 * 该方法在进行判断时，并不会对 `value` 进行隐式转换 (`Number(value)`)。如果 `value` 不是一个数字，则直接返回 `false`。
 * 该方法其实也可以用来判断字符串，写成 `isFinite(+value)` 即可。如果是判断其他值，则可以写成 `isFinite(Number(value))`。
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isNumberFinite(value: unknown): value is number {
    return Number.isFinite(value);
}

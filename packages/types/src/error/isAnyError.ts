import getTagEqual from '../type/getTagEqual';

/**
 * 是不是一个任意的 `Error` 对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @note
 *
 * 验证以下错误对象:
 *
 * - `Error`
 * - `EvalError`
 * - `RangeError`
 * - `ReferenceError`
 * - `SyntaxError`
 * - `TypeError`
 * - 一切 `Object.prototype.toString.call(value) === '[object Error]'` 的对象
 */
export default function isAnyError<T extends Error = Error>(
    value: unknown
): value is T {
    return getTagEqual<Error>(value, 'Error') || value instanceof Error;
}

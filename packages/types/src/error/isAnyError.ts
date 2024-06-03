import { getTagEqual } from '..';

/**
 * 是不是一个任意的 `Error` 对象
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
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isAnyError(value: unknown): value is Error {
    return getTagEqual<Error>(value, 'Error') || value instanceof Error;
}

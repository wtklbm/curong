import getTagEqual from '../type/getTagEqual';

/**
 * 是不是一个任意的 `Error` 对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @note
 *
 * ### 验证以下错误对象
 *
 * - `AggregateError`
 * - `Error`
 * - `EvalError`
 * - `RangeError`
 * - `ReferenceError`
 * - `SyntaxError`
 * - `TypeError`
 * - `URIError`
 * - 一切 `Object.prototype.toString.call(value) === '[object Error]'` 的对象
 *
 * ### 一个 `Error` 对象包含以下属性
 *
 * - `name`: 错误的类型名称
 * - `message`: 错误的消息
 * - `stack`: 当前堆栈的跟踪记录
 * - `cause` (可选): 导致错误的原因
 * - `fileName` (可选): 引发此错误的文件的路径
 * - `lineNumber` (可选): 引发此错误的代码所在的文件的行号
 * - `columnNumber` (可选): 引发此错误的代码在文件中所在行的列号
 */
export default function isAnyError<T extends Error = Error>(
    value: unknown
): value is T {
    // 还可以判断 `value instanceof Error`
    return getTagEqual<Error>(value, 'Error');
}

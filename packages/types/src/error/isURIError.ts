import isAnyError from './isAnyError';

/**
 * 是不是一个 `URIError` 对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @note
 *
 * - `URIError` 对象用来表示以一种错误的方式使用全局 URI 处理函数而产生的错误
 * - `URIError` 是可序列化对象，所以可以使用 `structuredClone()` 克隆它，或者在 `Worker` 间使用 `postMessage()` 拷贝这个对象
 */
export default function isURIError(value: unknown): value is EvalError {
    return (
        isAnyError(value) && Object.getPrototypeOf(value).name === 'URIError'
    );
}

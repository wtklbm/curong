import { isURIError } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个 `URIError` 对象
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 * @note
 *
 * - `URIError` 对象用来表示以一种错误的方式使用全局 URI 处理函数而产生的错误
 * - `URIError` 是可序列化对象，所以可以使用 `structuredClone()` 克隆它，或者在 `Worker` 间使用 `postMessage()` 拷贝这个对象
 */
export default function assertURIError(
    value: unknown,
    variableName: string
): asserts value is TypeError {
    return typeGuard(value, variableName, isURIError);
}

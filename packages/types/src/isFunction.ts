/** 函数的类型定义 */
export type Function<T = any> = (...args: any[]) => T;

/**
 * 是不是一个函数(包含同步函数、异步函数和 `Generator` 函数)
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isFunction<T = any>(
    value: unknown
): value is Function<T> {
    return typeof value === 'function';
}

import getTag from './getTag';

/** 异步函数的类型定义 */
export type AsyncFunction<T = unknown> = (...args: any[]) => Promise<T>;

/**
 * 是不是一个异步函数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isAsyncFunction<T = unknown>(
    value: unknown
): value is AsyncFunction<T> {
    return getTag(value) === 'AsyncFunction';
}

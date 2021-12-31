import getTag from './getTag';

/**
 * 是不是一个异步函数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isAsyncFunction(value: unknown): value is Function {
    return getTag(value) === 'AsyncFunction';
}

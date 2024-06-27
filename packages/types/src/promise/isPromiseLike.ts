import isFunction from '../function/isFunction';
import isTypeofObject from '../object/isTypeofObject';

/**
 * 是不是一个有 `then` 方法的像 `Promise` 的对象或函数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isPromiseLike<T = unknown>(
    value: unknown
): value is Promise<T> {
    return (
        (isTypeofObject(value) || isFunction(value)) &&
        isFunction((value as unknown as Promise<T>).then)
    );
}

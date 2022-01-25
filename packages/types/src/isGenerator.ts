import getTag from './getTag';

/**
 * 是不是一个 `Generator`
 *
 * 每一个 `Generator` 上，都会有三个方法:
 *  - `next`
 *  - `throw`
 *  - `return`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isGenerator<T = unknown, R = unknown, N = unknown>(
    value: any
): value is Generator<T, R, N> {
    return getTag(value) === 'Generator';
}

import isAsyncGenerator from './isAsyncGenerator';
import isSyncGenerator from './isSyncGenerator';

/**
 * 是不是一个同步或异步的 `Generator`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @note
 *
 * - 每一个 `Generator` 上，都会有三个方法: `next`、`throw`、`return`
 */
export default function isGenerator<T = unknown, R = unknown, N = unknown>(
    value: any
): value is Generator<T, R, N> | AsyncGenerator<T, R, N> {
    return isSyncGenerator(value) || isAsyncGenerator(value);
}

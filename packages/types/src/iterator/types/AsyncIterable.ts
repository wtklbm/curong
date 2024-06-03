/** 异步可迭代的类型 */
export interface AsyncIterable<T = unknown, R = any, N = unknown> {
    [Symbol.asyncIterator](): AsyncGenerator<T, R, N>;
}

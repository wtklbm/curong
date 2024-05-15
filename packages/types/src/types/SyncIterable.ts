/** 同步可迭代的类型 */
export interface SyncIterable<T> {
    [Symbol.iterator](): Iterator<T>;
}

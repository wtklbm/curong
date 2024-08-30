export type MemoizeWithReturn<F extends (...args: unknown[]) => unknown, K> = {
    /** 缓存对象 */
    cache: Map<K, { value: ReturnType<F>; expiration: number }>;

    /** 清空所有已缓存的值 */
    clear(): void;

    /** 清空已缓存的键的值 */
    delete(...args: Parameters<F>): void;
} & F;

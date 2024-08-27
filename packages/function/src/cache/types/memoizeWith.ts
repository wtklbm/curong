export type MemoizeWithReturn<F extends (...args: unknown[]) => unknown, K> = {
    clear(): void;
    cache: Map<K, ReturnType<F>>;
} & F;

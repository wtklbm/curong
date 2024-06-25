/** 异步函数的类型定义 */
export type AsyncFunction<T = unknown, A extends unknown[] = unknown[]> = (
    ...args: A
) => Promise<T>;

/** 异步函数的类型定义 */
export type AsyncFunction<R = unknown, A extends unknown[] = unknown[]> = (
    ...args: A
) => Promise<R>;

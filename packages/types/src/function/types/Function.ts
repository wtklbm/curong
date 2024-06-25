/** 函数的类型定义 */
export type Function<T = unknown, A extends unknown[] = unknown[]> = (
    ...args: A
) => T;

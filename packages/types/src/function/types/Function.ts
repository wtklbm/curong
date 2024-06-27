/** 函数的类型定义 */
export type Function<R = unknown, A extends unknown[] = unknown[]> = (
    ...args: A
) => R;

/** 异步函数的类型定义 */
export type AsyncFunction<T = unknown> = (...args: any[]) => Promise<T>;

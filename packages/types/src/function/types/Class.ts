/**
 * 类的类型定义
 *
 * `interface` 的写法：
 *
 * ```typescript
 * export interface Class<T = unknown, A extends unknown[] = unknown[]> {
 *    new (...args: A): T;
 * }
 * ```
 */
export type Class<T = unknown, A extends unknown[] = unknown[]> = new (
    ...args: A
) => T;

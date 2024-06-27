/**
 * 类的类型定义
 *
 * `interface` 的写法：
 *
 * ```typescript
 * export interface Class<R = unknown, A extends unknown[] = unknown[]> {
 *    new (...args: A): R;
 * }
 * ```
 */
export type Class<R = unknown, A extends unknown[] = unknown[]> = new (
    ...args: A
) => R;

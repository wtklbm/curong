/**
 * 类的类型定义
 *
 * `interface` 的写法：
 *
 * ```typescript
 * export interface Class<T = unknown> {
 *    new (...args: any[]): T;
 * }
 * ```
 */
export type Class<T = unknown> = new (...args: any[]) => T;

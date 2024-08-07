/**
 * 包含指定类型 `T` 或 `null` 的类型
 *
 * 这个类型可以用于表示一个值可能是某种类型的实例，或者是 `null` 的状态
 *
 * @example
 *
 * ```typescript
 * const name: WithNull<string> = 'Alice'; // 有效
 * const age: WithNull<number> = null; // 有效
 * const address: WithNull<string> = '123 Main St'; // 有效
 * const invalid: WithNull<string> = undefined; // 无效，因为 undefined 不是 null
 * ```
 */
export type WithNull<T> = T | null;

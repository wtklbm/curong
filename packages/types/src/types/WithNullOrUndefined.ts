/**
 * 包含指定类型 `T`、`null` 或 `undefined` 的类型
 *
 * 这个类型可以用于表示一个值可能是某种类型的实例，或者是 `null` 或 `undefined` 的状态
 *
 * @example
 * ```typescript
 * const name: WithNullOrUndefined<string> = 'Alice'; // 有效
 * const age: WithNullOrUndefined<number> = null; // 有效
 * const address: WithNullOrUndefined<string> = undefined; // 有效
 * const invalid: WithNullOrUndefined<string> = 123; // 无效，因为 123 不是 null 或 undefined
 * ```
 */
export type WithNullOrUndefined<T> = T | null | undefined;

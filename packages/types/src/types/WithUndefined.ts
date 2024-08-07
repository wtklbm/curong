/**
 * 包含指定类型 `T` 或 `undefined` 的类型
 *
 * 这个类型可以用于表示一个值可能是某种类型的实例，或者是 `undefined` 的状态
 *
 * @example
 *
 * ```typescript
 * const name: WithUndefined<string> = 'Alice'; // 有效
 * const age: WithUndefined<number> = undefined; // 有效
 * const address: WithUndefined<string> = '123 Main St'; // 有效
 * const invalid: WithUndefined<string> = null; // 无效，因为 null 不是 undefined
 * ```
 */
export type WithUndefined<T> = T | undefined;

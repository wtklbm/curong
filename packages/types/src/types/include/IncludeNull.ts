/**
 * 包含指定类型 `T` 或 `null` 的类型
 *
 * 这个类型可以用于表示一个值可能是某种类型的实例，或者是 `null` 的状态
 *
 * @example
 *
 * ```typescript
 * const name: IncludeNull<string> = 'Alice'; // 有效
 * const age: IncludeNull<number> = null; // 有效
 * const address: IncludeNull<string> = '123 Main St'; // 有效
 * const invalid: IncludeNull<string> = undefined; // 无效，因为 undefined 不是 null
 * ```
 */
export type IncludeNull<T> = T | null;

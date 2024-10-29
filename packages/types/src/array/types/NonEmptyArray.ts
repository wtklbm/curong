/**
 * 非空数组类型的条件类型，确保数组至少包含一个元素
 *
 * 该类型主要用于确保数组在使用时不为空，从而提高代码的安全性和可用性
 *
 * @param T 数组中元素的类型，可以是任何有效的 `TypeScript` 类型
 * @example
 *
 * ```typescript
 * type StringArray = NonEmptyArray<string>; // [string, ...string[]]
 * type NumberArray = NonEmptyArray<number>; // [number, ...number[]]
 * type MixedArray = NonEmptyArray<string | number>; // [string | number, ...(string | number)[]]
 * ```
 */
export type NonEmptyArray<T> = [T, ...T[]];

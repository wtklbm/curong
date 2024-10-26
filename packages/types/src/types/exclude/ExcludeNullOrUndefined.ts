/**
 * 从类型 `T` 中排除 `null` 和 `undefined`
 *
 * 该类型主要用于确保类型中不包含 `null` 或 `undefined` 值，从而提高类型安全性和可用性
 *
 * @param T 原始类型，可以是基本类型、联合类型、交叉类型等
 * @example
 *
 * ```typescript
 * type Example1 = ExcludeNullOrUndefined<string | null | undefined>; // string
 * type Example2 = ExcludeNullOrUndefined<null | number | undefined>; // number
 * type Example3 = ExcludeNullOrUndefined<{ name: string | null; age: number | undefined }>; // { name: string | null; age: number | undefined }
 * type Example4 = ExcludeNullOrUndefined<null | void | undefined>; // void
 * type Example5 = ExcludeNullOrUndefined<null | string | number | undefined>; // string | number
 * ```
 *
 * @note
 *  - 该类型仅排除完全匹配的 `null` 和 `undefined`，不会影响其他值
 *  - 使用此类型时，应确保 `T` 是一个可以包含 `null` 或 `undefined` 的类型
 *  - 对于不包含 `null` 和 `undefined` 的类型，使用此类型不会产生影响，结果将与输入相同
 */
export type ExcludeNullOrUndefined<T> = Exclude<T, null | undefined>;

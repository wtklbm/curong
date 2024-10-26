/**
 * 从类型 `T` 中排除 `undefined`
 *
 * 该类型主要用于确保类型中不包含 `undefined` 值，从而提高类型安全性
 *
 * @param T 原始类型，可以是基本类型、联合类型、交叉类型等
 * @example
 *
 * ```typescript
 * type Example1 = ExcludeUndefined<string | undefined>; // string
 * type Example2 = ExcludeUndefined<undefined | number | boolean>; // number | boolean
 * type Example3 = ExcludeUndefined<{ name: string; age: number | undefined }>; // { name: string; age: number | undefined }
 * type Example4 = ExcludeUndefined<undefined | void>; // void
 * type Example5 = ExcludeUndefined<null | string | number | undefined>; // null | string | number
 * ```
 *
 * @note
 *  - 该类型仅排除完全匹配的 `undefined`，不会影响其他值
 *  - 使用此类型时，应确保 `T` 是一个可以包含 `undefined` 的类型
 *  - 对于不包含 `undefined` 的类型，使用此类型不会产生影响，结果将与输入相同
 */
export type ExcludeUndefined<T> = Exclude<T, undefined>;

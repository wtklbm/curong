/**
 * 从类型 `T` 中排除 `null`
 *
 * 该类型主要用于确保类型中不包含 `null` 值，从而提高类型安全性
 *
 * @param T 原始类型，可以是基本类型、联合类型、交叉类型等
 * @example
 *
 * ```typescript
 * type Example1 = ExcludeNull<string | null | undefined>; // string | undefined
 * type Example2 = ExcludeNull<null | number | boolean>; // number | boolean
 * type Example3 = ExcludeNull<{ name: string | null; age: number | null }>; // { name: string | null; age: number | null }
 * type Example4 = ExcludeNull<null | void>; // void
 * type Example5 = ExcludeNull<null | string | number | undefined>; // string | number | undefined
 * ```
 *
 * @note
 *  - 该类型仅排除完全匹配的 `null`，不会影响未定义的属性
 *  - 使用此类型时，应确保 `T` 是一个可以包含 `null` 的类型
 *  - 对于不包含 `null` 的类型，使用此类型不会产生影响，结果将与输入相同
 */
export type ExcludeNull<T> = Exclude<T, null>;

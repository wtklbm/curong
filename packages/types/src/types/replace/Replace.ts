/**
 * 在 `T` 类型中匹配 `M` 类型的部分并将其替换为 `N`
 *
 * 该类型通常用于类型转换和重构，帮助在条件判断的基础上创建新的类型结构
 *
 * @param T 原始类型，可以是基本类型、联合类型、交叉类型等
 * @param M 需要匹配的类型
 * @param N 用于替换匹配类型的目标类型
 * @example
 *
 * ```typescript
 * type Result1 = Replace<string | number, string, boolean>; // boolean | number
 * type Result2 = Replace<"apple" | "banana" | "cherry", "banana", "orange">; // "apple" | "orange" | "cherry"
 * type Result3 = Replace<{ name: string; age: number }, string, boolean>; // { name: string; age: number }
 * type Result4 = Replace<"cat" | "dog", "mouse", "hamster">; // "cat" | "dog"
 * type Result5 = Replace<{ status: "active" | "inactive"; id: number }, "active", "pending">; // { status: "pending" | "inactive"; id: number }
 * ```
 *
 * @note
 *  - 该类型只会替换完全匹配 `M` 的部分，部分匹配不会生效
 *  - 对于复杂的嵌套或组合类型，`Replace` 可能无法如预期般处理；此时可以考虑更细粒度的替换逻辑
 */
export type Replace<T, M, N> = T extends M ? N : T;

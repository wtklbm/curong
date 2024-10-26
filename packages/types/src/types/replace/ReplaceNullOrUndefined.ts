import type { Replace } from './Replace';

/**
 * 将 `T` 类型中的 `null` 和 `undefined` 替换为 `N`
 *
 * 该类型主要用于处理可能为空或未定义的属性，确保类型的安全性和可用性
 *
 * @param T 原始类型，可以是基本类型、联合类型、交叉类型等
 * @param N 用于替换 `null` 和 `undefined` 的目标类型
 * @example
 *
 * ```typescript
 * type Result1 = ReplaceNullOrUndefined<string | null | undefined, boolean>; // string | boolean
 * type Result2 = ReplaceNullOrUndefined<null | undefined, number>; // number
 * type Result3 = ReplaceNullOrUndefined<{ name: string; age: null | undefined }, boolean>; // { name: string; age: boolean }
 * type Result4 = ReplaceNullOrUndefined<undefined | string | null, boolean>; // boolean | string
 * type Result5 = ReplaceNullOrUndefined<{ status: null; id: undefined }, "inactive">; // { status: "inactive"; id: "inactive" }
 * ```
 *
 * @note
 *  - 该类型仅替换完全匹配 `null` 或 `undefined` 的部分，未定义的属性不会影响替换结果
 *  - 在处理复杂嵌套类型时，可能需要额外的类型映射以确保所有 `null` 和 `undefined` 均被替换
 */
export type ReplaceNullOrUndefined<T, N> = Replace<T, null | undefined, N>;

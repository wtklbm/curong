import type { Replace } from './Replace';

/**
 * 将 `T` 类型中的 `null` 替换为 `N`
 *
 * 该类型主要用于处理可能为空的属性或类型，以增强类型的安全性和可用性
 *
 * @param T 原始类型，可以是基本类型、联合类型、交叉类型等
 * @param N 用于替换 `null` 的目标类型
 * @example
 *
 * ```typescript
 * type Result1 = ReplaceNull<string | null, undefined>; // string | undefined
 * type Result2 = ReplaceNull<null, number>; // number
 * type Result3 = ReplaceNull<{ name: string; age: null }, boolean>; // { name: string; age: boolean }
 * type Result4 = ReplaceNull<null | string | number, boolean>; // boolean | string | number
 * type Result5 = ReplaceNull<{ status: null; id: number }, "inactive">; // { status: "inactive"; id: number }
 * ```
 *
 * @note
 *  - 该类型仅替换完全匹配 `null` 的部分，未定义的属性不会影响替换结果
 *  - 在处理复杂嵌套类型时，可能需要额外的类型映射以确保所有 `null` 均被替换
 */
export type ReplaceNull<T, N> = Replace<T, null, N>;

import type { Replace } from './Replace';

/**
 * 将 `T` 类型中的 `undefined` 替换为 `N`
 *
 * 该类型主要用于处理可能未定义的属性或类型，确保类型的安全性和可用性
 *
 * @param T 原始类型，可以是基本类型、联合类型、交叉类型等
 * @param N 用于替换 `undefined` 的目标类型
 * @example
 *
 * ```typescript
 * type Result1 = ReplaceUndefined<string | undefined, null>; // string | null
 * type Result2 = ReplaceUndefined<undefined, number>; // number
 * type Result3 = ReplaceUndefined<{ name: string; age?: undefined }, boolean>; // { name: string; age?: boolean }
 * type Result4 = ReplaceUndefined<undefined | string | number, boolean>; // boolean | string | number
 * type Result5 = ReplaceUndefined<{ status: undefined; id: number }, "unknown">; // { status: "unknown"; id: number }
 * ```
 *
 * @note
 *  - 该类型仅替换完全匹配 `undefined` 的部分，未定义的属性不会影响替换结果
 *  - 在处理复杂嵌套类型时，可能需要额外的类型映射以确保所有 `undefined` 均被替换
 */
export type ReplaceUndefined<T, N> = Replace<T, undefined, N>;

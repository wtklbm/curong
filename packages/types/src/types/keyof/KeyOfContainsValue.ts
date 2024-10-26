/**
 * 获取 `T` 类型中包含特定 `V` 类型的键
 *
 * 该类型返回的是那些属性值可以赋值为 `V` 的所有键，主要用于根据类型推断相关的属性
 *
 * @param T 原始对象类型，其属性值可能包含 `V`
 * @param V 需要匹配的类型
 * @example
 *
 * ```typescript
 * type Result1 = KeyOfContainsValue<{ a: string; b: number; c: boolean }, string>; // "a"
 * type Result2 = KeyOfContainsValue<{ x: string; y: number; z: string[] }, string>; // "x"
 * type Result3 = KeyOfContainsValue<{ id: number; name: string; active: boolean }, boolean>; // "active"
 * type Result4 = KeyOfContainsValue<{ p: string | number; q: boolean; r: number[] }, number>; // "p"
 * type Result5 = KeyOfContainsValue<{}, string>; // never
 * ```
 *
 * @note
 *  - 该类型返回的键可能是 `never`，表示没有任何属性值符合条件
 *  - 使用时应确保 `V` 类型与 `T` 的属性值类型相匹配
 *  - 对于包含多个属性值的联合类型，返回的键可能会有多个
 *  - 该类型在使用时不会影响 `T` 的结构，仅作为类型推断的工具
 */
export type KeyOfContainsValue<T, V> = {
    [K in keyof T]: V extends T[K] ? K : never;
}[keyof T];

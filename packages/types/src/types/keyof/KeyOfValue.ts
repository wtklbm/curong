/**
 * 获取 `T` 类型中包含特定 `V` 的键
 *
 * 该类型主要用于从对象中筛选出具有指定值类型的键，有助于类型安全地访问对象属性
 *
 * @param T 原始对象类型，可以是任何具有键值对的类型
 * @param V 需要匹配的值类型
 * @example
 *
 * ```typescript
 * type Example1 = KeyOfValue<{ a: string; b: number; c: null }, string>; // "a"
 * type Example2 = KeyOfValue<{ x: string; y: boolean; z: string }, string>; // "x" | "z"
 * type Example3 = KeyOfValue<{ name: string; age: number; isActive: boolean }, boolean>; // "isActive"
 * type Example4 = KeyOfValue<{ id: null; value: undefined; status: "active" }, "active">; // "status"
 * type Example5 = KeyOfValue<{ foo: number; bar: string; baz: number }, number>; // "foo" | "baz"
 * ```
 *
 * @note
 *  - 该类型返回的键是联合类型，表示 `T` 中所有值等于 `V` 的键
 *  - 如果 `V` 是 `T` 中某个键的值类型，则该键将包含在结果中
 *  - 如果 `V` 是一个联合类型，则结果将包含所有与该联合类型中的任意值匹配的键
 *  - 使用此类型可以方便地筛选出符合特定条件的属性，从而提升代码的类型安全性
 */
export type KeyOfValue<T, V> = {
    [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

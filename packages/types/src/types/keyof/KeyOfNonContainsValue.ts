/**
 * 获取 `T` 类型中不包含特定 `V` 的键
 *
 * 该类型主要用于从对象中筛选出不包含某个特定值的键，有助于类型安全地访问对象属性
 *
 * @param T 原始对象类型，可以是任何具有键值对的类型
 * @param V 需要排除的值类型
 * @example
 *
 * ```typescript
 * type Example1 = KeyOfNonContainsValue<{ a: string; b: number; c: null }, string>; // "b" | "c"
 * type Example2 = KeyOfNonContainsValue<{ x: string; y: boolean; z: number }, boolean>; // "x" | "z"
 * type Example3 = KeyOfNonContainsValue<{ name: string; age: number; isActive: boolean }, number>; // "name" | "isActive"
 * type Example4 = KeyOfNonContainsValue<{ id: null; value: undefined; status: "active" }, undefined>; // "id" | "status"
 * type Example5 = KeyOfNonContainsValue<{ foo: number; bar: string; baz: number }, number>; // "bar"
 * ```
 *
 * @note
 *  - 该类型返回的键是联合类型，表示 `T` 中所有不包含 `V` 的键
 *  - 当 `V` 是 `T` 中某个键的值类型时，该键将被排除在结果之外
 *  - 如果 `V` 是一个联合类型，则所有包含该联合类型中任意值的键都会被排除
 *  - 在类型较复杂时，可能需要结合其他条件类型进行更复杂的类型推导
 */
export type KeyOfNonContainsValue<T, V> = {
    [K in keyof T]: V extends T[K] ? never : K;
}[keyof T];

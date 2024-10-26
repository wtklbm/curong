/**
 * 获取 `T` 类型中不等于特定 `V` 的键
 *
 * 该类型主要用于从对象中筛选出不包含特定值的键，有助于类型安全地访问对象属性
 *
 * @param T 原始对象类型，可以是任何具有键值对的类型
 * @param V 需要排除的值类型
 * @example
 *
 * ```typescript
 * type Example1 = KeyOfNonValue<{ a: string; b: number; c: null }, number>; // "a" | "c"
 * type Example2 = KeyOfNonValue<{ x: string; y: boolean; z: string }, string>; // "y"
 * type Example3 = KeyOfNonValue<{ name: string; age: number; isActive: boolean }, boolean>; // "name" | "age"
 * type Example4 = KeyOfNonValue<{ id: null; value: undefined; status: "active" }, "active">; // "id" | "value"
 * type Example5 = KeyOfNonValue<{ foo: number; bar: number; baz: string }, number>; // "baz"
 * ```
 *
 * @note
 *  - 该类型返回的键是联合类型，表示 `T` 中所有不等于 `V` 的键
 *  - 当 `V` 是 `T` 中某个键的值类型时，该键将被排除在结果之外
 *  - 如果 `V` 是一个联合类型，则所有等于该联合类型中任意值的键都会被排除
 *  - 该类型可以与其他条件类型结合使用，以便进行更复杂的类型推导和条件筛选
 */
export type KeyOfNonValue<T, V> = {
    [K in keyof T]: T[K] extends V ? never : K;
}[keyof T];

/**
 * 将类型 `T` 中的所有属性变为可选，并允许值为 `null`
 *
 * 该类型用于将类型 `T` 中的所有属性变为可选，同时允许整个对象的值为 `null`。返回的类型可以是 `T` 的部分属性或 `null`。
 * 该类型通常用于需要处理部分属性可选，且有时可能为空的场景。
 *
 * @template T 类型对象
 * @returns 返回一个新的类型，类型 `T` 中的所有属性都变为可选，整个对象可以为 `null`
 * @example
 * ```typescript
 * interface Person {
 *   name: string;
 *   age: number;
 * }
 *
 * type NullablePerson = PartialOrNull<Person>;
 *
 * const person1: NullablePerson = { name: 'Alice' }; // `age` 是可选的
 * const person2: NullablePerson = null; // 整个对象可以为 `null`
 * const person3: NullablePerson = { name: 'Bob', age: 30 }; // 所有属性都可以是部分赋值
 * ```
 * @note
 *  - `PartialOrNull` 类型通过将 `T` 转换为 `Partial<T>` 并与 `null` 联合，允许返回值可以是部分赋值或者 `null`
 *  - 使用该类型时，要小心区分是否允许 `null` 值的场景
 *  - 如果需要返回 `null`，则该类型是合适的选择；如果不希望接受 `null`，则应避免使用此类型
 *  - 该类型允许灵活处理可能缺少部分属性或为空的对象，但可能增加代码中的空值处理逻辑
 *  - 使用时要确保代码中适当处理了 `null` 的情况，以防出现 `null` 引用错误
 */
export type PartialOrNull<T> = Partial<T> | null;

/**
 * 将类型 `T` 中的所有属性变为可选，并允许值为 `null` 或 `undefined`
 *
 * 该类型用于将类型 `T` 中的所有属性变为可选，同时允许整个对象的值为 `null` 或 `undefined`。返回的类型可以是 `T` 的部分属性，或者 `null` 或 `undefined`。
 * 该类型通常用于需要处理部分属性可选，且可能为 `null` 或 `undefined` 的场景。
 *
 * @template T 类型对象
 * @returns 返回一个新的类型，类型 `T` 中的所有属性都变为可选，整个对象可以为 `null` 或 `undefined`
 * @example
 * ```typescript
 * interface Person {
 *   name: string;
 *   age: number;
 * }
 *
 * type NullablePerson = PartialOrNullable<Person>;
 *
 * const person1: NullablePerson = { name: 'Alice' }; // `age` 是可选的
 * const person2: NullablePerson = null; // 整个对象可以为 `null`
 * const person3: NullablePerson = undefined; // 整个对象可以为 `undefined`
 * const person4: NullablePerson = { name: 'Bob', age: 30 }; // 所有属性都可以是部分赋值
 * ```
 * @note
 *  - `PartialOrNullable` 类型通过将 `T` 转换为 `Partial<T>` 并与 `null` 和 `undefined` 联合，允许返回值是部分赋值、`null` 或 `undefined`
 *  - 使用该类型时，返回值可以是部分赋值，也可以是空值（`null` 或 `undefined`），适合需要支持多种状态的场景
 *  - 该类型允许灵活处理缺少部分属性、`null` 或 `undefined` 的对象，但可能需要在代码中额外处理空值情况
 *  - 在处理 `null` 或 `undefined` 时，务必确保代码中适当检查空值，以避免出现 `null` 或 `undefined` 引用错误
 *  - 使用时要注意，不同场景下对 `null` 和 `undefined` 的处理可能不同，需要根据具体需求作出适当判断
 */
export type PartialOrNullable<T> = Partial<T> | null | undefined;

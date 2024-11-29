/**
 * 将类型 `T` 中指定的某个属性 `K` 设为可变（去掉只读属性），而保留其他属性的只读状态
 *
 * 该类型用于将类型 `T` 中的某个指定属性（由 `K` 指定）的 `readonly` 修饰符去掉，使得该属性变为可变，而其他属性保持原样，仍然是只读的。
 * 该类型适用于需要在修改对象的某些属性时保留其余属性只读约束的场景。
 *
 * @template T 类型对象
 * @template K 需要去掉只读修饰符的属性键
 * @returns 返回一个新的类型，类型 `T` 中的指定属性 `K` 的 `readonly` 修饰符被移除，其他属性保持原状
 * @example
 * ```typescript
 * interface Person {
 *   readonly name: string;
 *   readonly age: number;
 *   readonly country: string;
 * }
 *
 * type MutableNamePerson = MutableKey<Person, 'name'>;
 *
 * const person: MutableNamePerson = { name: 'Alice', age: 30, country: 'USA' };
 * person.name = 'Bob'; // 现在可以修改 `name`
 * person.age = 35; // 仍然不能修改 `age`，因为它是只读的
 * ```
 * @note
 *  - `MutableKey` 类型通过 `Pick` 和 `Omit` 分别选择指定的属性 `K` 和其他属性，确保只修改 `K` 的 `readonly` 修饰符
 *  - 该类型仅去掉了 `K` 属性的 `readonly` 修饰符，其他属性的只读限制保持不变
 *  - 使用该类型时，要确保传入的 `K` 属性存在于类型 `T` 中，否则会导致类型错误
 *  - 如果 `K` 所指定的属性本身就不是只读的，`MutableKey` 类型的效果不会产生任何变化
 *  - 适用于那些希望仅修改对象中特定属性的场景，同时保持其他属性不可修改的需求
 */
export type MutableKey<T, K extends keyof T> = {
    -readonly [Key in keyof Pick<T, K>]: T[Key];
} & {
    [Key in keyof Omit<T, K>]: T[Key];
};

/**
 * 将 `T` 中的所有属性设为可变（去掉只读属性）
 *
 * 该类型用于将类型 `T` 中的所有属性的 `readonly` 修饰符去掉，使得这些属性变为可变。
 * 通常用于需要修改某些对象属性但又不想修改整个类型的只读约束的场景。
 *
 * @template T 需要修改属性的类型
 * @returns 返回一个新的类型，类型 `T` 中的所有属性将不再是只读的
 * @example
 * ```typescript
 * interface Person {
 *   readonly name: string;
 *   readonly age: number;
 * }
 *
 * type MutablePerson = Mutable<Person>;
 *
 * const person: MutablePerson = { name: 'Alice', age: 30 };
 * person.name = 'Bob'; // 现在可以修改属性
 * person.age = 35; // 现在可以修改属性
 * ```
 * @note
 *  - `Mutable` 类型仅去掉了原类型中 `readonly` 修饰符，它不会改变其他类型约束，如必填性或其他类型限制
 *  - 使用该类型时，确保原始类型的 `readonly` 属性适合被修改，否则可能导致逻辑上的错误
 *  - 如果传入的类型已经没有 `readonly` 修饰符，`Mutable` 类型的效果不会产生任何变化
 *  - 该类型适用于需要通过赋值或操作修改原对象属性的情况，而不需要直接修改原类型的定义
 *  - 使用时要小心，如果对象的属性本来是不可变的，强行使用 `Mutable` 可能会导致不可预见的副作用
 */
export type Mutable<T> = {
    -readonly [K in keyof T]: T[K];
};

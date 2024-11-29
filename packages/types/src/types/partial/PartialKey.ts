/**
 * 将类型 `T` 中指定的某个属性 `K` 设置为可选，而保持其他属性不变
 *
 * 该类型用于将类型 `T` 中的某个指定属性（由 `K` 指定）设置为可选，即使其原本是必填的。其他属性则保持原样，不受影响。
 * 该类型常用于需要部分属性可选而其他属性保持不变的场景。
 *
 * @template T 类型对象
 * @template K 需要设置为可选的属性键
 * @returns 返回一个新的类型，类型 `T` 中的指定属性 `K` 被转为可选，其他属性保持不变
 * @example
 * ```typescript
 * interface Person {
 *   name: string;
 *   age: number;
 *   country: string;
 * }
 *
 * type OptionalAgePerson = OptionalKey<Person, 'age'>;
 *
 * const person: OptionalAgePerson = { name: 'Alice', country: 'USA' }; // `age` 现在是可选的
 * const anotherPerson: OptionalAgePerson = { name: 'Bob', age: 30, country: 'Canada' }; // `age` 也可以存在
 * ```
 * @note
 *  - `OptionalKey` 类型通过 `Omit` 去除 `K` 属性，并使用 `Partial` 将 `K` 属性转为可选，从而达到使特定属性变为可选的效果
 *  - 使用时要确保传入的 `K` 属性存在于类型 `T` 中，否则会导致类型错误
 *  - 该类型不会修改其他属性，只会改变指定属性的必填性
 *  - 如果 `K` 本身已经是可选的，使用 `OptionalKey` 类型不会有任何效果
 *  - 适用于希望部分属性变为可选的场景，而其他属性保持原有必填状态
 */
export type OptionalKey<T, K extends keyof T> = Omit<T, K> &
    Partial<Pick<T, K>>;

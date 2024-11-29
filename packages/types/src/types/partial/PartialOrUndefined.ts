/**
 * 将类型 `T` 中的所有属性变为可选，并允许值为 `undefined`
 *
 * 该类型用于将类型 `T` 中的所有属性变为可选，同时允许整个对象的值为 `undefined`。返回的类型可以是 `T` 的部分属性，或者 `undefined`。
 * 该类型通常用于需要处理部分属性可选，且可能为 `undefined` 的场景。
 *
 * @template T 类型对象
 * @returns 返回一个新的类型，类型 `T` 中的所有属性都变为可选，整个对象可以为 `undefined`
 * @example
 * ```typescript
* interface Person {
*   name: string;
*   age: number;
* }
*
* type UndefinedPerson = PartialOrUndefined<Person>;
*
* const person1: UndefinedPerson = { name: 'Alice' }; // `age` 是可选的
* const person2: UndefinedPerson = undefined; // 整个对象可以为 `undefined`
* const person3: UndefinedPerson = { name: 'Bob', age: 30 }; // 所有属性都可以是部分赋值
* ```
* @note
*  - `PartialOrUndefined` 类型通过将 `T` 转换为 `Partial<T>` 并与 `undefined` 联合，允许返回值是部分赋值或者 `undefined`
*  - 使用该类型时，要小心区分是否允许 `undefined` 值的场景
*  - 如果需要返回 `undefined`，则该类型是合适的选择；如果不希望接受 `undefined`，则应避免使用此类型
*  - 该类型允许灵活处理可能缺少部分属性或为空的对象，但可能增加代码中的空值处理逻辑
*  - 使用时要确保代码中适当处理了 `undefined` 的情况，以防出现未定义错误
*/
export type PartialOrUndefined<T> = Partial<T> | undefined;

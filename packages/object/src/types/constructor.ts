/** 未知的构造函数的类型 */
export type UnknownConstructor<
    T extends {} = {},
    A extends unknown[] = unknown[]
> = new (...args: A) => T;

/** 未知的构造函数的类型 */
export type UnknownConstructorFunction<
    T extends {} = {},
    A extends unknown[] = unknown[]
> = (...args: A) => T;

/** 类构造函数的类型 */
export type ConstructorLike<T = unknown> = { readonly prototype: T };

/** 构造函数的类型 */
export type Constructor<T extends {} = {}> = ConstructorLike &
    (UnknownConstructor<T> | UnknownConstructorFunction<T>);

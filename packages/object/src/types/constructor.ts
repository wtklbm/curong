/** 未知的构造函数的类型 */
export type UnknownConstructor<T extends {} = {}> = new (...args: any[]) => T;

/** 未知的构造函数的类型 */
export type UnknownConstructorFunction<T extends {} = {}> = (
    ...args: any[]
) => T;

/** 类构造函数的类型 */
export type ConstructorLike<T = unknown> = { readonly prototype: T };

/** 构造函数的类型 */
export type Constructor<T extends {} = {}> = ConstructorLike &
    (UnknownConstructor<T> | UnknownConstructorFunction<T>);

/** 从给定类型中排除 `null` 和 `undefined` 类型 (`NonNullable` 的别名) */
export type NonNullOrUndefined<T> = NonNullable<T>;

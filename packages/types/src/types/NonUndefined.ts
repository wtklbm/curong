/** 从给定类型中排除 `undefined` 类型 */
export type NonUndefined<T> = T extends undefined ? never : T;

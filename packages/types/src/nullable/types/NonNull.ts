/** 从给定类型中排除 `null` 类型 */
export type NonNull<T> = T extends null ? never : T;

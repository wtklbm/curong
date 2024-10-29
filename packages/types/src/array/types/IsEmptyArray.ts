import type { NonEmptyArray } from './NonEmptyArray';

/**
 * 检查数组是否为空的条件类型
 *
 * 该类型主要用于在编译时检查给定类型是否为空数组，并返回布尔值
 *
 * @param T 要检查的类型，可以是任何数组类型
 * @example
 *
 * ```typescript
 * type Result3 = IsEmptyArray<[]>; // true
 * type Result1 = IsEmptyArray<number[]>; // true
 * type Result5 = IsEmptyArray<NonEmptyArray<number>>; // false
 * ```
 */
export type IsEmptyArray<T> = T extends unknown[]
    ? T extends NonEmptyArray<unknown>
        ? false
        : true
    : false;

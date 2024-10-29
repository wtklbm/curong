import type { IsNever } from '../../primitive';

/**
 * 检查对象是否为空的条件类型
 *
 * 该类型用于判断给定类型是否为一个空对象，并返回布尔值
 *
 * @param T 要检查的类型，可以是任何对象类型
 * @example
 *
 * ```typescript
 * type Result1 = IsEmptyObject<{}>; // true
 * type Result2 = IsEmptyObject<{ a: number }>; // false
 * type Result3 = IsEmptyObject<{ [key: string]: any }>; // false
 * type Result4 = IsEmptyObject<null>; // false
 * type Result5 = IsEmptyObject<any>; // false
 * ```
 */
export type IsEmptyObject<T> = T extends Object ? IsNever<keyof T> : false;

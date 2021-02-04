import { Primitive } from './types/common';

/**
 * 对相同类型的基本类型的值或包含相同类型基本类型值的数组去重
 *
 * @param args 要去重的一个或多个值或数组的集合
 * @returns 返回去重好的数组
 * @example
 *
 * ```javascript
 * const a1 = [1, 2, 3];
 * const a2 = [4, 5, 6, 1, 2, 3];
 * const a3 = [4, 5, 6, 7, 8, 9];
 * const ret = uniqueFromPrimitive(a1, a2, a3, 32);
 * console.log(ret); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 32 ]
 * ```
 *
 * # 关于 `Symbol`
 *
 * 在 `JavaScript` 中，包含 7 种基本类型：
 *   `string`，`number`，`bigint`，`boolean`，`null`，`undefined`，`symbol`。
 * 因为每一个 `Symbol` 对象都是唯一的，所以在对 `Symbol` 对象去重时，会得到两种情况。
 *
 * ## 情况一
 *
 * ```javascript
 * const ret = uniqueFromPrimitive(Symbol('1'), [Symbol('2'), Symbol('1')]);
 * console.log(ret); // [ Symbol(1), Symbol(2), Symbol(1) ]
 * ```
 *
 * ## 情况二
 *
 * ```javascript
 * const s1 = Symbol('1');
 * const s2 = Symbol('2');
 * const ret = uniqueFromPrimitive(s1, s2, [s2, s1]);
 * console.log(ret); // [ Symbol(1), Symbol(2) ]
 * ```
 */
export default function uniqueFromPrimitive<T extends Primitive>(
    ...args: Array<T | T[]>
): T[] {
    return Array.from(new Set(args.flat())) as T[];
}

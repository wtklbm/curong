/**
 * 数组去重，返回由唯一元素组成的新数组
 *
 * 该函数接受多个元素或数组参数，并将它们扁平化为一个数组后，移除重复项，返回一个包含唯一元素的新数组。
 * 通过 `Set` 数据结构实现去重，确保结果中每个元素仅出现一次。
 *
 * @param args 要去重的一个或多个值或数组的集合
 * @returns 返回去重好的数组
 * @example
 * ```typescript
 * const a1 = [1, 2, 3];
 * const a2 = [2, 3];
 * const a3 = [1, 3];
 * const ret = uniq(a1, a2, a3, 4);
 * console.log(ret); // [ 1, 2, 3, 4 ]
 * ```
 * @note
 *  - 使用 `Set` 实现去重操作，因此顺序与元素首次出现的位置保持一致
 *  - 参数支持混合类型输入，包括单个元素和数组
 *  - 如果需要对嵌套更深的数组去重，请使用更复杂的扁平化方法
 *  - 适用于合并多个数组并去重的场景，例如处理用户输入或数据整合
 *
 * # 关于 `Symbol`
 *
 * 在 `JavaScript` 中，包含 7 种基本类型：
 *   `string`，`number`，`bigint`，`boolean`，`null`，`undefined`，`symbol`。
 * 因为每一个 `Symbol` 对象都是唯一的，所以在对 `Symbol` 对象去重时，会得到两种情况。
 *
 * ## 情况一
 *
 * ```typescript
 * const ret = uniq(Symbol('1'), [Symbol('2'), Symbol('1')]);
 * console.log(ret); // [ Symbol(1), Symbol(2), Symbol(1) ]
 * ```
 *
 * ## 情况二
 *
 * ```typescript
 * const s1 = Symbol('1');
 * const s2 = Symbol('2');
 * const ret = uniq(s1, s2, [s2, s1]);
 * console.log(ret); // [ Symbol(1), Symbol(2) ]
 * ```
 */
export default function uniq<T>(...args: Array<T | T[]>): T[] {
    return Array.from(new Set(args.flat())) as T[];
}

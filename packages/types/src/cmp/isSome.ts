/**
 * 检查数组中是否至少有一个元素满足给定的条件
 *
 * @param value 要验证的值或值数组
 * @param predicate 要满足的条件或条件数组
 * @returns 如果至少有一个元素满足条件，则返回 `true`，否则为 `false`
 * @example
 *
 * ```javascript
 * isSome(1, v => v > 0); // true
 * isSome([1, 2, 3], v => v > 2); // true
 * isSome([1, 2, 3], [v => v > 1, v => v < 3]); // true
 * ```
 */
export default function isSome<
    V extends unknown,
    P extends (value: V) => boolean
>(value: V | V[], predicate: P | P[]): value is V {
    const fns = [predicate].flat();
    return ([value].flat() as V[]).some(v => fns.every(f => f(v)));
}

/**
 * 通过泛型声明来判断是不是某一个类型的值
 *
 * 该方法只是一个空函数，永远不会抛出异常也没有返回值。
 *
 * @param value 要验证的值
 * @example
 *
 * ```typescript
 * function test(value: unknown) {
 *     // 点不出东西
 *     //value.
 *
 *     assertType<string>(value);
 *
 *     // 可以点出东西
 *     value.
 *
 *     // 还可以继续点出东西
 *     value.
 * }
 * ```
 */
export default function assertType<T>(value: unknown): asserts value is T {}

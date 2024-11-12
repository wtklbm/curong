/**
 * 通过泛型声明来判断是不是某一个类型的值
 *
 * @param value 要验证的值
 * @returns 该方法验证任何值都会返回 `true`
 * @example
 *
 * ```typescript
 * function test(value: unknown) {
 *     // 点不出东西
 *     //value.
 *
 *     // 可以点出东西
 *     isType<string>(value) && value.
 *
 *     // 又不能点出东西了
 *     //value.
 * }
 * ```
 */
export default function isType<T>(value: any): value is T {
    return true;
}

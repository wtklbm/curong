import isArrayHave from '../array/isArrayHave';
import isNaN from '../number/isNaN';

/**
 * **简单** 的判断多个的值是否不相等
 *
 * 基本类型会比较值是否相等，引用类型会比较引用是否相等。
 *
 * @param value 当前值
 * @param args 要跟当前值比较的多个值
 * @returns 不相等返回 `true`，否则为 `false`
 */
export default function isNotEqual<T extends unknown[]>(
    value: unknown,
    ...args: T
): boolean {
    const handle = isNaN(value)
        ? (v: unknown) => !isNaN(v)
        : (v: unknown) => value !== v;

    return isArrayHave(args) && args.every(handle);
}

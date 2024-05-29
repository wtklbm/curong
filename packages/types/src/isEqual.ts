import isArrayHave from './isArrayHave';

/**
 * `简单` 的判断多个的值是否相等
 *
 * 基本类型会比较值是否相等，引用类型会比较引用是否相等。
 *
 * @param value 当前值
 * @param args 要跟当前值比较的多个值
 * @returns 相等返回 `true`，否则为 `false`
 */
export default function isEqual(value: any, ...args: any[]): boolean {
    const handle = Number.isNaN(value)
        ? (v: any) => Number.isNaN(v)
        : (v: any) => value === v;

    return isArrayHave(args) && args.every(handle);
}

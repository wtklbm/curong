/**
 * 是不是一个大于 0 的安全的无符号整数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isUintSafeHave(value: any): value is number {
    return Number.isSafeInteger(value) && value > 0;
}

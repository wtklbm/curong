import isStringFilled from '../../string/isStringFilled';

/**
 * 是不是一个二进制表示形式的数字字符串，例如 `0b1010`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isBinaryString(value: unknown): value is string {
    return isStringFilled(value) && /^0b[10]+$/.test(value);
}

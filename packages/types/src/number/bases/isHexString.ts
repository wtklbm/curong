import isStringFilled from '../../string/isStringFilled';

/**
 * 是不是一个十六进制表示形式的数字字符串，例如 `0xA`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isHexString(value: unknown): value is string {
    return isStringFilled(value) && /^0x[0-9a-fA-F]+$/.test(value);
}

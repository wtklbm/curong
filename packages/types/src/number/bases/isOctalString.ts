import isStringFilled from '../../string/isStringFilled';

/**
 * 是不是一个八进制表示形式的数字字符串，例如 `0o12`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isOctalString(value: unknown): value is string {
    return isStringFilled(value) && /^0o[0-7]+$/.test(value);
}

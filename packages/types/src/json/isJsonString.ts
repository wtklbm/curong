import isStringFilled from '../string/isStringFilled';

/**
 * 是不是一个 JSON 字符串
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`。空字符串为 `false`
 */
export default function isJsonString(value: unknown): value is string {
    if (!isStringFilled(value)) {
        return false;
    }

    try {
        JSON.parse(value);
        return true;
    } catch {
        return false;
    }
}

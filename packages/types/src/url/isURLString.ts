import isString from '../string/isString';

/**
 * 是不是一个可以转换为 `URL` 对象的的字符串
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 *
 * ```typescript
 * console.log(isURLString(12345)); // false
 * console.log(isURLString('not a url')); // false
 * console.log(isURLString('https://www.example.com')); // true
 * console.log(isURLString('file:///path/to/file')); // true
 * console.log(isURLString('mailto:example@example.com')); // true
 * ```
 */
export default function isURLString(value: unknown): value is string {
    if (!isString(value)) {
        return false;
    }

    try {
        new URL(value);
        return true;
    } catch {}

    return false;
}

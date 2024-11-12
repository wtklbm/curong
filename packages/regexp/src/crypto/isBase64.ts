import { isStringFilled } from '@curong/types';

/**
 * 是不是一个 `base64`
 *
 * @param value 要验证的值
 * @param isUrlSafe 是否确保是 URL 安全的，默认为 `false`
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 *
 * ```typescript
 * const ret = isBase64('YmFzZTY0');
 * console.log(ret); // true
 * ```
 */
export default function isBase64(str: string, isUrlSafe = false) {
    if (!isStringFilled(str)) {
        return false;
    }

    if (isUrlSafe) {
        return /^[-A-Z0-9_]+$/i.test(str);
    }

    const len = str.length;

    if (len % 4 !== 0 || /[^A-Z0-9+/=]/i.test(str)) {
        return false;
    }

    const firstPaddingChar = str.indexOf('=');

    return (
        firstPaddingChar === -1 ||
        firstPaddingChar === len - 1 ||
        (firstPaddingChar === len - 2 && str[len - 1] === '=')
    );
}

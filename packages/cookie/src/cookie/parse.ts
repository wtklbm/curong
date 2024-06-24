import { isFunctionFilled, isString, isStringFilled } from '@curong/types';

import type { ParseCookieOptions } from './types';

/**
 * 解码一个值
 *
 * @param value 要解码的值
 * @param decode 要使用的 `decode` 回调函数
 * @returns 返回解码后的值或者 `null`
 * @throws
 *
 * - 如果 `decode` 函数返回的值不是字符串，则会抛出异常
 */
function getDecode(
    value: string,
    decode?: ParseCookieOptions['decode']
): string {
    value = value.trim();

    // 如果值包含双引号
    if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1).trim();
    }

    // 如果是函数
    if (isFunctionFilled(decode)) {
        const newValue = decode(value);

        if (!isString(newValue)) {
            throw new TypeError(`[getDecode]: 返回值不是字符串, "${newValue}"`);
        }

        return newValue;
    }

    return value;
}

/**
 * 解析 `cookie`, 把 `cookie` 字符串转换为`key: value` 形式的 `cookie` 对象
 *
 * @param cookie `cookie` 字符串
 * @param decode 解析字符串的值的函数，回调函数有一个参数。
 * @returns 返回解析好的 `cookie` 对象
 * @throws
 *
 * - 如果要解析的字符串不是 `cookie` 字符串，则会抛出异常
 *
 * @example
 *
 * ```javascript
 * const cookie =
 *     'htVD_2132_saltkey=UrzaeSMmA; htVD_2132_lastvisit=15797202730; htVD_2132_connect_is_bind=0; htVD_2132_smile=1D1';
 * const cookieObj = parseCookie(cookie);
 *
 * // {
 * //     htVD_2132_saltkey: 'UrzaeSMmA',
 * //     htVD_2132_lastvisit: '15797202730',
 * //     htVD_2132_connect_is_bind: '0',
 * //     htVD_2132_smile: '1D1'
 * // }
 * console.log(cookieObj);
 * ```
 */
export default function parseCookie(
    cookie: string,
    decode?: ParseCookieOptions['decode']
): { [key: string]: string } {
    const result: { [key: string]: string } = {};

    if (!isStringFilled(cookie) || !cookie.includes('=')) {
        throw new TypeError(`[parse]: cookie不是一个字符串, "${cookie}"`);
    }

    for (
        let i = 0, star = 0, key = null, value = null, len = cookie.length;
        i < len;
        i++
    ) {
        switch (cookie[i]) {
            case '=':
                key = cookie.slice(star, i).trim();
                star = i + 1;
                break;

            case ';':
                value = getDecode(cookie.slice(star, i), decode);
                star = i + 1;
                break;

            // NOTE: 逻辑是否正确呢?
            case '\n':
                continue;
        }

        if (isString(key)) {
            if (isString(value)) {
                result[key] = value;
                key = null;
                value = null;
            } else if (i === len - 1) {
                result[key] = getDecode(cookie.slice(star), decode);
            }
        }
    }

    return result;
}

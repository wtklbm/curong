import { isStringHave } from '@curong/types';

import { COMMA, EQUAL, SEMICOLON, whiteSpaceReg } from './constants';

const skipSpace = (cookie: string, index: number) => {
    while (index < cookie.length && whiteSpaceReg.test(cookie.charAt(index))) {
        index += 1;
    }

    return index < cookie.length;
};

/**
 * 将以逗号合并在一起的 `set-cookie` 字符串转换为 `set-cookie` 字符串数组
 *
 * @param cookie `set-cookie` 字符串
 * @returns 返回拆分好的 `set-cookie` 字符串数组
 * @note 这种以逗号合并的 `cookie` 通常出现在 `React Native` 中
 * @example
 *
 * ```javascript
 * const v = [
 *     'SNUID=CB4C700A7277B659D1A8F4FB73E8A03C; expires=Tue, 07-Jun-22 11:49:38 GMT; domain=.sogou.com; path=/',
 *     'FUV=998fcca98f0de2afb3fcef727102dbf7; path=/; expires=Tue, 07 Jun 2022 11:49:38 GMT'
 * ].join(',');
 *
 * const ret = splitSetCookie(v);
 *
 * // [
 * //     'SNUID=CB4C700A7277B659D1A8F4FB73E8A03C; expires=Tue, 07-Jun-22 11:49:38 GMT; domain=.sogou.com; path=/',
 * //     'FUV=998fcca98f0de2afb3fcef727102dbf7; path=/; expires=Tue, 07 Jun 2022 11:49:38 GMT'
 * // ]
 * console.log(ret);
 * ```
 */
export default function splitSetCookie(cookie: string): string[] {
    if (!isStringHave(cookie)) {
        return [];
    }

    const cookies: string[] = [];

    let index: number = 0;
    let start: number;
    let char: string;
    let last: number;
    let nextStart: number;
    let isSep: boolean;

    const isSpecial = () => {
        char = cookie.charAt(index);
        return char !== EQUAL && char !== SEMICOLON && char !== COMMA;
    };

    while (index < cookie.length) {
        start = index;
        isSep = false;

        while (skipSpace(cookie, index)) {
            char = cookie.charAt(index);
            if (char === COMMA) {
                last = index;
                index += 1;

                skipSpace(cookie, index);
                nextStart = index;

                while (index < cookie.length && isSpecial()) {
                    index += 1;
                }

                if (index < cookie.length && cookie.charAt(index) === EQUAL) {
                    isSep = true;
                    index = nextStart;
                    cookies.push(cookie.substring(start, last));
                    start = index;
                } else {
                    index = last + 1;
                }
            } else {
                index += 1;
            }
        }

        if (!isSep || index >= cookie.length) {
            cookies.push(cookie.substring(start, cookie.length));
        }
    }

    return cookies;
}

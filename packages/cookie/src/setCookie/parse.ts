import { isStringHave } from '@curong/types';

import { equalReg, semicolonReg } from './constants';

import {
    ParseSetCookieOptions,
    SetCookieItem,
    SetCookieParseResult
} from './types';

/**
 * 对 `cookie` 对象中的字段赋值
 *
 * @param cookie `cookie` 对象
 * @param key 要设置的属性名
 * @param value 要设置的属性值
 * @returns 返回老的 `cookie` 对象
 */
const setCookieValue = (cookie: SetCookieItem, key: string, value: string) => {
    switch (key) {
        case 'expires':
            cookie.expires = new Date(value);
            break;

        case 'max-age':
            cookie.maxAge = parseInt(value, 10);
            break;

        case 'secure':
            cookie.secure = true;
            break;

        case 'httponly':
            cookie.httpOnly = true;
            break;

        case 'samesite':
            cookie.sameSite = value;
            break;

        default:
            cookie[key] = value;
            break;
    }

    return cookie;
};

/**
 * 解析 `cookie` 片段
 *
 * @param cookie `cookie` 字符串
 * @param isDecode 时候解码 `cookie` 字符串中的值，默认为 `true`
 * @returns 返回解析好的内容
 */
function parseChunk(cookie: string, isDecode: boolean = true) {
    const parts = cookie.split(semicolonReg).filter(isStringHave);

    if (parts.length <= 1) {
        throw new Error(
            `[parseChunk]: cookie使用分号拆分却只拆分出来一个值出来，"${cookie}"`
        );
    }

    const nameValue = parts.shift()!.split(equalReg);
    const name = nameValue.shift();
    let value = nameValue.join('=');

    if (isDecode) {
        try {
            value = decodeURIComponent(value);
        } catch (error) {
            console.error(
                `[parseChunk]: Cookie解码失败，cookie: "${value}", error: "${error}"`
            );
        }
    }

    const result = { name: name, value: value } as SetCookieItem;

    return parts.reduce((cookie: SetCookieItem, part: string) => {
        const sides = part.split(equalReg);

        if (sides.length <= 1) {
            throw new Error(
                `[parseChunk]: part使用等号拆分却只拆分出来一个值出来，"${part}"`
            );
        }

        const key = sides.shift()!.toLowerCase();

        return setCookieValue(cookie, key, sides.join('='));
    }, result);
}

/**
 * 解析 `set-cookie` 字符串数组
 *
 * @param cookies `set-cookie` 字符串数组
 * @param options 配置选项
 *
 *  - `map`: 是返回一个 `set-cookie` 对象，还是返回一个 `set-cookie` 数组，如果为 `true`， 则返回一个 `set-cookie` 对象，默认为 `false`
 *  - `decode`: 是否解码 `cookie` 字符串的值，默认为 `true`
 *
 * @returns
 * @throws 如果解析 `set-cookie` 失败，则会抛出异常
 * @note
 *
 *  - `name`: cookie 名称 (string)
 *  - `value`: cookie 值 (string)
 *  - `path`: cookie 路径 (string 或 undefined)
 *  - `domain`: cookie 的域 (string 或 undefined，可以以 "." 开头以指示命名域或其任何子域)
 *  - `expires`: cookie 的绝对过期日期 (Date 对象或 undefined)
 *  - `maxAge`: 从客户端接收到 cookie 的相对最大年龄 (以秒为单位) (整数或 undefined)
 *  - `secure`: 表示这个 cookie 应该只通过 HTTPs 发送 (true 或 undefined)
 *  - `httpOnly`: 表明这个 cookie 应该*不*被客户端访问 集成开发环境 JavaScript (true or undefined)
 *  - `sameSite`: 表示 cookie 不应与跨站点请求一起发送 (string 或 undefined)
 *
 * @example
 *
 * ```javascript
 * const v = [
 *     'SNUID=CB4C700A7277B659D1A8F4FB73E8A03C; expires=Tue, 07-Jun-22 11:49:38 GMT; domain=.sogou.com; path=/',
 *     'FUV=998fcca98f0de2afb3fcef727102dbf7; path=/; expires=Tue, 07 Jun 2022 11:49:38 GMT'
 * ];
 *
 * let ret = parseSetCookie(v);
 *
 * // [
 * //     {
 * //         name: 'SNUID',
 * //         value: 'CB4C700A7277B659D1A8F4FB73E8A03C',
 * //         expires: new Date('2022-06-07T11:49:38.000Z'),
 * //         domain: '.sogou.com',
 * //         path: '/'
 * //     },
 * //     {
 * //         name: 'FUV',
 * //         value: '998fcca98f0de2afb3fcef727102dbf7',
 * //         path: '/',
 * //         expires: new Date('2022-06-07T11:49:38.000Z'),
 * //     }
 * // ]
 * console.log(ret);
 *
 *
 * ret = parseSetCookie(v, { map: true });
 *
 * // {
 * //     SNUID: {
 * //         name: 'SNUID',
 * //         value: 'CB4C700A7277B659D1A8F4FB73E8A03C',
 * //         expires: new Date('2022-06-07T11:49:38.000Z'),
 * //         domain: '.sogou.com',
 * //         path: '/'
 * //     },
 * //     FUV: {
 * //         name: 'FUV',
 * //         value: '998fcca98f0de2afb3fcef727102dbf7',
 * //         path: '/',
 * //         expires: new Date('2022-06-07T11:49:38.000Z'),
 * //     }
 * // }
 * console.log(ret);
 * ```
 */
export default function parseSetCookie(
    cookies: string[],
    options?: ParseSetCookieOptions
): SetCookieParseResult {
    const { decode = true, map = false } = options ?? {};

    if (!map) {
        return cookies.map((str: string) => parseChunk(str, decode));
    }

    return cookies.reduce((cookie, str) => {
        const v = parseChunk(str, decode);
        cookie[v.name] = v;
        return cookie;
    }, {} as Record<string, SetCookieItem>);
}

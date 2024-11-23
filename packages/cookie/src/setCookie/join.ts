import { isArrayFilled, isTypeofObject } from '@curong/types';

import type { SetCookieParseResult } from './types';

/**
 * 将解析后的 `set-cookie` 对象转换为一个 `key=value; key=value` 的 `cookie` 字符串
 *
 * @param cookie 解析后的 `set-cookie` 对象
 * @returns 返回 `cookie` 字符串
 * @example
 *
 * ```typescript
 * const parsedCookie = {
 *     SNUID: {
 *         name: 'SNUID',
 *         value: 'CB4C700A7277B659D1A8F4FB73E8A03C',
 *         expires: new Date('2022-06-07T11:49:38.000Z'),
 *         domain: '.sogou.com',
 *         path: '/'
 *     },
 *     FUV: {
 *         name: 'FUV',
 *         value: '998fcca98f0de2afb3fcef727102dbf7',
 *         path: '/',
 *         expires: new Date('2022-06-07T11:49:38.000Z')
 *     }
 * };
 *
 * const ret = joinSetCookie(parsedCookie);
 *
 * // SNUID=CB4C700A7277B659D1A8F4FB73E8A03C; FUV=998fcca98f0de2afb3fcef727102dbf7
 * console.log(ret);
 * ```
 */
export default function joinSetCookie(cookie: SetCookieParseResult): string {
    if (isTypeofObject(cookie)) {
        cookie = Object.values(cookie);
    }

    if (isArrayFilled(cookie)) {
        return cookie.map(({ name, value }) => `${name}=${value}`).join('; ');
    }

    throw new Error('[joinSetCookie] 拼接 Cookie 失败', {
        cause: { cookie }
    });
}

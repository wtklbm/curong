import {
    isDate,
    isFinite,
    isFunctionFilled,
    isString,
    isStringFilled,
    isTrue
} from '@curong/types';

import type { CreateCookieOptions } from './types';

/**
 * 通过设置 `name`、`value` 和 `options` 属性配置，生成一个 `cookie` 字符串
 *
 * @param name 名称
 * @param value 值
 * @param options `cookie` 的属性的配置对象
 * @returns 返回生成好的 `cookie` 字符串
 * @throws
 *
 * - 如果 `name` 的值不是预期的，则会抛出异常
 * - 如果 `value` 的值不是预期的，则会抛出异常
 * - 如果 `encode` 不是带参数的函数，则会抛出异常
 *
 * @example
 *
 * ```javascript
 * const cookie = createCookie('wtklbm', 'value', {
 *     encode(value) {
 *         return value;
 *     },
 *     maxAge: 10,
 *     domain: '/',
 *     path: '/xxx',
 *     expires: new Date('2020-01-01'),
 *     httpOnly: true,
 *     secure: true,
 *     sameSite: true
 * });
 *
 * // 'wtklbm=value; Max-Age=10; Domain=/; Path=/xxx; Expires=Wed, 01 Jan 2020 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict'
 * console.log(cookie);
 * ```
 */
export default function createCookie(
    name: string,
    value: string,
    options: CreateCookieOptions
): string {
    const verifyReg = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

    if (!isString(name) || !verifyReg.test(name)) {
        throw new TypeError(`[create]: name的值不是预期的: "${name}"`);
    }

    const { encode = encodeURIComponent } = options ?? {};

    if (!isFunctionFilled(encode)) {
        throw new TypeError(`[create]: encode不是一个带参的函数: "${encode}"`);
    }

    value = encode(value);

    if (!isString(value) || !verifyReg.test(value)) {
        throw new Error(`[create]: value的值不是预期的: "${value}"`);
    }

    const compiler: {
        [key: string]: (value: any, chunk: string[]) => string[];
    } = {
        maxAge(v: number, chunk: string[]) {
            chunk.push(`Max-Age=${isFinite(v) ? Math.floor(v) : 0}`);
            return chunk;
        },

        domain(v: string, chunk: string[]) {
            isStringFilled(v) && verifyReg.test(v) && chunk.push(`Domain=${v}`);
            return chunk;
        },

        path(v: any, chunk: string[]) {
            isStringFilled(v) && verifyReg.test(v) && chunk.push(`Path=${v}`);
            return chunk;
        },

        expires(v: any, chunk: string[]) {
            isDate(v) && chunk.push(`Expires=${v.toUTCString()}`);
            return chunk;
        },

        httpOnly(v: any, chunk: string[]) {
            isTrue(v) && chunk.push(`HttpOnly`);
            return chunk;
        },

        secure(v: any, chunk: string[]) {
            isTrue(v) && chunk.push(`Secure`);
            return chunk;
        },

        sameSite(v: any, chunk: string[]) {
            if (isString(v)) {
                v = v.toLowerCase() as CreateCookieOptions['sameSite'];
            }

            switch (v) {
                case true:
                    chunk.push(`SameSite=Strict`);
                    break;
                case 'lax':
                    chunk.push(`SameSite=Lax`);
                    break;
                case 'strict':
                    chunk.push(`SameSite=Strict`);
                    break;
                case 'none':
                    chunk.push(`SameSite=None`);
                    break;
            }

            return chunk;
        }
    };

    return Object.keys(compiler)
        .reduce(
            (memo: string[], v: string) => {
                return compiler[v](
                    options[v as keyof CreateCookieOptions],
                    memo
                );
            },
            [`${name}=${value}`]
        )
        .join('; ');
}

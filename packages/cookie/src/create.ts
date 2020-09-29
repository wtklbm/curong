import {
    isString,
    isFunctionHave,
    isDate,
    isNumberSafe,
    isStringHave,
    isTrue
} from '@curong/types';

import { CreateOptions } from './types/create';

/**
 * 通过设置 `name`、`value` 和 `options` 属性配置，生成一个 `cookie` 字符串
 *
 * @param name 名称
 * @param value 值
 * @param options `cookie` 的属性的配置对象
 * @returns 返回生成好的 `cookie` 字符串
 * @throw 如果参数不是预期的，则会抛出异常
 */
export default function create(
    name: string,
    value: string,
    options: CreateOptions
): string {
    const verifyReg = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

    if (!isString(name) || !verifyReg.test(name)) {
        throw new TypeError(`[create]: name的值不是预期的: "${name}"`);
    }

    const { encode = encodeURIComponent } = options || {};

    if (!isFunctionHave(encode)) {
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
            chunk.push(`Max-Age=${isNumberSafe(v) ? Math.floor(v) : 0}`);
            return chunk;
        },

        domain(v: string, chunk: string[]) {
            isStringHave(v) && verifyReg.test(v) && chunk.push(`Domain=${v}`);
            return chunk;
        },

        path(v: any, chunk: string[]) {
            isStringHave(v) && verifyReg.test(v) && chunk.push(`Path=${v}`);
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
                v = v.toLowerCase() as CreateOptions['sameSite'];
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
                return compiler[v](options[v as keyof CreateOptions], memo);
            },
            [`${name}=${value}`]
        )
        .join('; ');
}

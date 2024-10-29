import { isZero } from '@curong/types';

import codePointAt from '../character/codePointAt';

/**
 * 计算 `UTF-8`、`UTF-16` 的字符串编码长度，计算的长度值与 `Buffer.from(str).length` 等同
 *
 * @param value 要计算编码长度的字符串
 * @returns 如果该字符串符合 `UTF-16` 编码的代码点的计算规则，
 *   则返回计算好的编码长度，否则返回 `null`。
 *
 * @example
 *
 * ```typescript
 * const ret = bytesLength('中国');
 * console.log(ret); // 6
 * ```
 */
export default function bytesLength(value: string): number | null {
    if (isZero(value.length)) {
        return 0;
    }

    let length: number = 0;
    let point: number | null;

    for (let i = 0, len = value.length; i < len; i++) {
        // 返回一个小于 `1114112(0x110000)` 的非负整数，该整数是 `UTF​-16` 编码的代码点的代码点值。
        point = codePointAt(value, i)!;

        // https://encoding.spec.whatwg.org/#utf-8-encoder

        // `ASCII`
        if (point < 128) {
            length++;
            continue;
        }

        if (point < 2048) {
            // `U+0080 to U+07FF, inclusive`
            length += 2;
        } else if (point < 65536) {
            // `U+0800 to U+FFFF, inclusive`
            length += 3;
        } else if (point < 1114112) {
            // `U+10000 to U+10FFFF, inclusive`
            length += 4;
            i++;
        } else {
            return null;
        }
    }

    return length;
}

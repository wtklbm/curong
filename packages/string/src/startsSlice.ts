import { isUint, isFalse } from '@curong/types';

import { StartsSlice } from './types/startsSlice';
import toRegExpSource from './toRegExpSource';

/**
 * 判断一个字符串是不是以某个字符串开头，如果是则截取该字符串
 *
 * @param str 字符串
 * @param chunk 以什么字符串开头
 * @param options 配置对象
 *
 * - `position` 偏移索引位置，从该索引的后面找
 * - `preserve` 是否保留从索引 `0` 到偏移索引之间的值
 * - `caseSensitivity` 是否区分大小写
 *
 * @returns 如果是以某个字符串开头则截取后返回新的字符串，否则返回原始字符串
 * @example
 *
 * ```javascript
 * const ret = startsSlice('xxx', 'X', {
 *     position: 1,
 *     preserve: true,
 *     caseSensitivity: false
 * });
 *
 * console.log(ret); // 'xx'
 * ```
 */
export default function startsSlice(
    str: string,
    chunk: string,
    options?: StartsSlice
): string {
    const { position: pos = 0, preserve = false, caseSensitivity = true } =
        options || {};

    if (!isUint(pos) || str.length < pos) {
        throw new TypeError(`[startsSlice]: position不是有效索引, "${pos}"`);
    }

    let fn = (str: string, chunk: string) => str.startsWith(chunk, pos);

    if (isFalse(caseSensitivity)) {
        fn = (str: string, chunk: string) => {
            return new RegExp(`^${toRegExpSource(chunk)}`, 'i').test(
                str.slice(pos)
            );
        };
    }

    if (fn(str, chunk)) {
        str =
            (preserve ? str.slice(0, pos) : '') + str.slice(pos + chunk.length);
    }

    return str;
}

import { isUint, isFalse, isZero } from '@curong/types';

import toRegExpSource from './toRegExpSource';
import { GenericOptions } from './types/generic';

/**
 * 判断一个字符串是否不是以某些字符串开头
 *
 * @param str 字符串
 * @param chunks 字符串数组
 * @param options 配置参数
 *
 * - `position` 偏移位置索引，从该索引的后面找
 * - `caseSensitivity` 是否区分大小写
 *
 * @returns 如果不是以某些字符串开头则返回 `true`， 否则返回 `false`
 */
export default function notStarts(
    str: string,
    chunks: string[],
    options?: GenericOptions
) {
    if (isZero(str.length) || isZero(chunks.length)) {
        return true;
    }

    const { position: pos = 0, caseSensitivity = true } = options || {};

    if (!isUint(pos) || str.length < pos) {
        throw new TypeError(`[notStarts]: position不是有效索引, "${pos}"`);
    }

    let fn = (str: string, chunk: string) => str.startsWith(chunk, pos);

    if (isFalse(caseSensitivity)) {
        str = str.slice(pos);
        fn = (str: string, chunk: string) =>
            new RegExp(`^${toRegExpSource(chunk)}`, 'i').test(str);
    }

    for (let i = 0, len = chunks.length; i < len; i++) {
        if (fn(str, chunks[i])) {
            return false;
        }
    }

    return true;
}

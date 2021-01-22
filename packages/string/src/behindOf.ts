import { isUint, isFalse, isZero } from '@curong/types';

import toRegExp from './toRegExp';
import { GenericOptions } from './types/generic';

/**
 * 从一个字符串的指定索引的后面查找是否包含某个字符串
 *
 * @param str 字符串
 * @param chunks 要检测哪些字符串
 * @param options 配置参数
 *
 * - `position` 偏移位置索引，从该索引的前面找
 * - `caseSensitivity` 是否区分大小写
 *
 * @returns 如果在截取的从索引 `position` 到 `str.length` 的位置的字符串中找到的某个字符串，
 * 只要有一个结果返回 `true`，那么结果就是 `true`，否则返回 `false`。
 */
export default function behindOf(
    str: string,
    chunks: string[],
    options?: GenericOptions
): boolean {
    if (isZero(str.length) || isZero(chunks.length)) {
        return false;
    }

    const { position: pos, caseSensitivity = true } = options || {};

    let fn = (str: string, chunk: string) => str.includes(chunk, pos);

    if (isFalse(caseSensitivity)) {
        const l = str.length;
        str = str.slice(0, isUint(pos) && pos < l ? pos : l);
        fn = (str: string, chunk: string) => toRegExp(chunk, 'i').test(str);
    }

    for (let i = 0, len = chunks.length; i < len; i++) {
        if (fn(str, chunks[i])) {
            return true;
        }
    }

    return false;
}

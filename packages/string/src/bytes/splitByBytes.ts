import { isNull, isUintFilled } from '@curong/types';

import fromChars from '../chars/fromChars';
import toChars from '../chars/toChars';

import bytesLength from './bytesLength';

/**
 * 将一个字符串根据字节拆分为一个字符串数组
 *
 * @param value 要拆分的字符串
 * @param highWaterMark 最高水位线，它是大于 `0` 的无符号整数，默认为 `4096` 字节
 * @returns 返回拆分好的字符串数组
 * @throws
 *
 *  - 如果 `highWaterMark` 不是大于 `0` 的无符号整数，则会抛出异常
 *  - 如果在转换字节时失败，则会抛出异常
 *
 * @example
 *
 * ```typescript
 * const v = '中华人民共和国中央人民政府';
 * const ret = splitByBytes(v, 6);
 * console.log(ret); // ['中华', '人民', '共和', '国中', '央人', '民政', '府'];
 * ```
 */
export default function splitByBytes(value: string, highWaterMark = 4096) {
    if (!isUintFilled(highWaterMark)) {
        throw new TypeError(
            '[splitByBytes] highWaterMark 必须为大于 0 的无符号整数',
            {
                cause: { value, highWaterMark }
            }
        );
    }

    const ret: string[][] = [];
    const charArray = toChars(value);
    const push = (value: string) => (ret[idx] = (ret[idx] ?? []).concat(value));

    let tmp = 0;
    let idx = 0;
    let char: string;
    let byte: number | null;

    while (charArray.length > 0) {
        char = charArray.shift()!;
        byte = bytesLength(char);

        if (isNull(byte)) {
            throw new Error('[splitByBytes] 转换字节失败, byte 不能为 null', {
                cause: { value, highWaterMark, char, byte }
            });
        }

        if (tmp + byte > highWaterMark) {
            idx++;
            push(char);
            tmp = byte;
            continue;
        }

        push(char);
        tmp += byte;
    }

    return ret.map(v => fromChars(v));
}

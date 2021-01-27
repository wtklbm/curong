import { isFunctionHave, isString, isBuffer } from '@curong/types';

import { ReadlineCallback } from './types/readline';

/**
 * 一行一行地读取文本中的内容
 *
 * @param chunk 要读取的文本内容
 * @param encoding 转换 `Buffer` 用到的编码
 * @param callback 回调函数
 * @throws
 *
 * - 如果 `chunk` 不是 `Buffer` 或 `string`，则会抛出异常
 */
export default function readline(
    chunk: string | Buffer,
    encoding?: BufferEncoding | undefined | null | ReadlineCallback,
    callback?: ReadlineCallback
): Array<string> | null {
    const contents: Array<string> = [];
    const buffer: any[] = [];
    let toString: (data: any) => string;
    let flag: boolean;

    do {
        if ((flag = !isFunctionHave(callback))) {
            if (isFunctionHave(encoding)) {
                callback = encoding as ReadlineCallback;
                encoding = 'utf8';
            } else {
                callback = (value, _done) => contents.push(value);
                encoding = encoding || 'utf8';
            }
        }

        // 根据 `chunk` 的类型来处理换行
        if (isString(chunk)) {
            toString = data => data.join('');
            break;
        }

        if (isBuffer(chunk)) {
            toString = data =>
                Buffer.from(data).toString(encoding as BufferEncoding);
            break;
        }

        throw new TypeError(`[readline] 数据必须是 Buffer 或 string`);
    } while (false);

    for (let i = 0, len = chunk.length; i < len; i++) {
        const byte: string | number = chunk[i];

        switch (byte) {
            // '\r'
            case '\u000D':
                callback(toString(buffer), false);
                const next = chunk[i + 1];
                next && next === '\u000A' && i++;
                buffer.length = 0;
                break;

            // '\n'
            case '\u000A':
                callback(toString(buffer), false);
                buffer.length = 0;
                break;

            default:
                buffer.push(byte);
                break;
        }
    }

    callback(buffer.length ? toString(buffer) : '', true);

    if (flag) {
        return contents;
    }

    return null;
}

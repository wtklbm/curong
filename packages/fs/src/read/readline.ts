import { isBuffer, isFunction, isString } from '@curong/types';

import type { ReadlineCallback } from './types';

/**
 * 一行一行地读取文本中的内容
 *
 * @param chunk 要读取的文本内容
 * @param encoding 转换 `Buffer` 用到的编码
 * @param callback 回调函数
 * @throws 如果 `chunk` 不是 `Buffer` 或 `string`，则会抛出异常
 * @note
 *  - 在调用 `readline()` 之前，请勿使用 `access()` 检查文件的可访问性。
 *   这样做会引入竞态条件，因为其他进程可能会在两次调用之间更改文件的状态。
 *   相反，用户代码应该直接 `read` 文件并处理文件不可访问时引发的错误。
 */
export default function readline(
    chunk: string | Buffer,
    encoding?: BufferEncoding
): string[];

export default function readline(
    chunk: string | Buffer,
    callback: ReadlineCallback
): null;

export default function readline(
    chunk: string | Buffer,
    encoding: BufferEncoding,
    callback: ReadlineCallback
): null;

export default function readline(
    chunk: string | Buffer,
    encoding?: BufferEncoding | undefined | null | ReadlineCallback,
    callback?: ReadlineCallback
): string[] | null {
    const contents: string[] = [];
    const buffer: unknown[] = [];

    if (!isFunction(callback)) {
        if (isFunction(encoding)) {
            callback = encoding as ReadlineCallback;
            encoding = 'utf8';
        } else {
            callback = (value, _done) => contents.push(value);
            encoding = encoding ?? 'utf8';
        }
    }

    // 根据 `chunk` 的类型来处理换行
    let toString: (data: any) => string;

    if (isString(chunk)) {
        toString = data => data.join('');
    } else if (isBuffer(chunk)) {
        toString = data => {
            return Buffer.from(data).toString(encoding as BufferEncoding);
        };
    } else {
        throw new TypeError('chunk 必须是 Buffer 或 string', {
            cause: { function: 'readline', chunk, encoding, callback }
        });
    }

    for (let i = 0, len = chunk.length; i < len; i++) {
        const byte: string | number = chunk[i];

        switch (byte) {
            // 回车 (Carriage Return)，即 `\r`
            case '\u000D':
                callback(toString(buffer), false);
                const next = chunk[i + 1];
                next && next === '\u000A' && i++;
                buffer.length = 0;
                break;

            // 行结束 (End of Line)，即 `\n`
            case '\u000A':
                callback(toString(buffer), false);
                buffer.length = 0;
                break;

            default:
                buffer.push(byte);
                break;
        }
    }

    callback(toString(buffer), true);

    return contents.length ? contents : null;
}

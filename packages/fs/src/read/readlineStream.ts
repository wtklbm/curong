import { createReadStream, type PathLike } from 'fs';
import { createInterface } from 'readline';

import { isFunction } from '@curong/types';

import type { ReadlineStreamCallback } from './types';

/**
 * 基于流的形式一行一行的读取文件的内容
 *
 * @param path 文件的路径字符串、URL、Buffer
 * @param encoding 文件编码，默认为 `utf8`
 * @param callback 回调函数
 * @returns
 *  - 如果传递了回调函数，那么文件读完后该函数会返回 `null` 表示读取完毕
 *  - 如果没有传递回调函数，那么文件读完后该函数会返回一个包含每一行数据的字符串数组
 * @throws 如果文件读取失败，则会抛出异常
 * @note
 *  - 在调用 `readlineStream()` 之前，请勿使用 `access()` 检查文件的可访问性。
 *   这样做会引入竞态条件，因为其他进程可能会在两次调用之间更改文件的状态。
 *   相反，用户代码应该直接 `read` 文件并处理文件不可访问时引发的错误。
 */
export default async function readlineStream(
    path: PathLike,
    encoding?: BufferEncoding
): Promise<string[]>;

export default async function readlineStream(
    path: PathLike,
    callback: ReadlineStreamCallback
): Promise<null>;

export default async function readlineStream(
    path: PathLike,
    encoding: BufferEncoding,
    callback: ReadlineStreamCallback
): Promise<null>;

export default async function readlineStream(
    path: PathLike,
    encoding?: BufferEncoding | ReadlineStreamCallback,
    callback?: ReadlineStreamCallback
): Promise<string[] | null> {
    const ret: string[] = [];

    if (!isFunction(callback)) {
        if (isFunction(encoding)) {
            callback = encoding;
            encoding = 'utf8';
        } else {
            callback = (input: string) => ret.push(input);
            encoding = encoding ?? 'utf8';
        }
    }

    return new Promise(resolve => {
        const stream = createInterface({
            input: createReadStream(path, {
                encoding: encoding as BufferEncoding,
                flags: 'r+',
                mode: 0o755,
                autoClose: true,
                highWaterMark: 64 * 1024
            })
        });

        stream.on('line', callback as ReadlineStreamCallback);
        stream.on('error', error => {
            throw new Error('[readlineStream] 文件读取失败', {
                cause: {
                    path,
                    encoding,
                    callback,
                    error
                }
            });
        });
        stream.once('close', () => {
            stream.removeAllListeners();
            return resolve(ret.length ? ret : null);
        });
    });
}

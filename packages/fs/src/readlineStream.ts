import { createInterface } from 'readline';
import { createReadStream } from 'fs';

import { isFunctionHave } from '@curong/types';
import { format } from '@curong/term';

import isFile from './isFile';
import type { ReadlineStreamCallback } from './types';

/**
 * 基于流的形式一行一行的读取文件的内容
 *
 * @param pathString 文件的路径
 * @param encoding 文件编码，默认为 `utf8`
 * @param callback 回调函数
 *
 * 回调函数参数:
 *  - `input` 每一行的数据
 *
 * @returns
 *
 * - 如果传递了回调函数，那么文件读完后该函数会返回 `true` 表示读取完毕
 * - 如果没有传递回调函数，那么文件读完后该函数会返回一个包含每一行数据的字符串数组
 *
 * @throws
 *
 * - 如果 `pathString` 不是文件路径，则会抛出异常
 */
export default async function readlineStream(
    pathString: string,
    encoding?: BufferEncoding | ReadlineStreamCallback,
    callback?: ReadlineStreamCallback
): Promise<string[] | boolean> {
    if (!(await isFile(pathString))) {
        throw format({
            name: 'readlineStream',
            message: 'pathString不是一个文件的路径，该文件不存在',
            data: { pathString }
        });
    }

    const ret: string[] = [];

    if (!isFunctionHave(callback)) {
        if (isFunctionHave(encoding)) {
            callback = encoding;
            encoding = 'utf8';
        } else {
            callback = (input: string) => ret.push(input);
            encoding = encoding ?? 'utf8';
        }
    }

    return new Promise(resolve => {
        const stream = createInterface({
            input: createReadStream(pathString, {
                encoding: encoding as BufferEncoding,
                flags: 'r+',
                mode: 0o755,
                autoClose: true,
                highWaterMark: 64 * 1024
            })
        });

        stream.on('line', callback as ReadlineStreamCallback);

        stream.once('close', () => {
            stream.removeAllListeners();

            if (ret.length > 0) {
                return resolve(ret);
            }

            return resolve(true);
        });
    });
}

import { createReadStream } from 'fs';

import { format } from '@curong/term';
import { isUintSafe } from '@curong/types';

import type { ReadFragmentOptions } from './types';

/**
 * 从一个文件中读取一段长度的内容
 *
 * @param filePath 路径字符串，必须是绝对路径
 * @param options 配置对象
 *
 * - `start` 开始索引，默认为 0
 * - `end` 结束索引，默认为 0
 * - `firstLine` 是否只读取第一行，默认为 `false`
 *
 * @error 如果在读取文件夹时失败，则返回一个文件读取的错误
 * @returns 如果获取到文件的内容，则返回截取的文件内容，否则返回 `undefined`
 * @throws
 *
 * - 如果 `start` 不是安全数字，则会抛出异常
 * - 如果 `end` 不是安全数字，则会抛出异常
 */
export default function readFragment(
    filePath: string,
    options: ReadFragmentOptions
): Promise<string | void> {
    const { start = 0, end = 0, firstLine = false } = options;

    if (!isUintSafe(start) || !isUintSafe(end)) {
        throw format({
            name: 'readFragment',
            message: '参数错误',
            data: { filePath, options }
        });
    }

    return new Promise((resolve, reject) => {
        if (end > 0) {
            let data = '';
            const readStream = createReadStream(filePath, {
                encoding: 'utf8',
                start,
                end,
                autoClose: true
            });

            readStream.on('error', error => reject(error));

            readStream.on('data', chunk => {
                if (firstLine) {
                    return chunk;
                }

                return (data += chunk);
            });

            readStream.on('end', () => resolve(data));
        } else {
            return resolve();
        }
    });
}

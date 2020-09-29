import { createReadStream } from 'fs';

import { isUintSafe, isBoolean } from '@curong/types';
import { format } from '@curong/term';

import { ReadFragmentOptions } from './types/readFragment';

/**
 * 从一个文件中读取一段长度的内容
 *
 * @param filePath 路径字符串，必须是绝对路径
 * @param options 配置对象
 * @error 如果在读取文件夹时失败，则返回一个文件读取的错误
 * @returns 如果获取到文件的内容，则返回截取的文件内容，否则返回undefined
 */
export default function readFragment(
    filePath: string,
    options: ReadFragmentOptions
): Promise<string | void> {
    const { start = 0, end = 0, firstLine = false } = options;

    if (!isUintSafe(start) || !isUintSafe(end) || !isBoolean(firstLine)) {
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

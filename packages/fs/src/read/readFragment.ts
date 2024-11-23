import { createReadStream } from 'fs';

import { isUintSafe, isZero } from '@curong/types';

import type { ReadFragmentOptions } from './types';

/**
 * 从一个文件中读取一段长度的内容
 *
 * @param path 路径字符串，必须是绝对路径
 * @param options 配置对象
 *  - `start`: 开始索引，默认为 `0`
 *  - `end`: 结束索引，默认为 `0`
 *  - `firstLine`: 是否只读取第一行，默认为 `false`
 * @returns 如果获取到文件的内容，则返回截取的文件内容
 *  - 如果 `end` 为 `0` 或者 `start === end`，则直接返回空字符串
 * @throws
 *  - 如果 `start` 不是无符号的安全的整数，则会抛出异常
 *  - 如果 `end` 不是无符号的安全的整数，则会抛出异常
 *  - 如果文件读取失败，则会抛出异常
 * @note
 *  - 在调用 `readFragment()` 之前，请勿使用 `access()` 检查文件的可访问性。
 *   这样做会引入竞态条件，因为其他进程可能会在两次调用之间更改文件的状态。
 *   相反，用户代码应该直接 `read` 文件并处理文件不可访问时引发的错误。
 */
export default function readFragment(
    path: string,
    options: ReadFragmentOptions
): Promise<string> {
    const { start = 0, end = 0, firstLine = false } = options;

    return new Promise(resolve => {
        if (!isUintSafe(start) || !isUintSafe(end)) {
            throw new TypeError(
                '[readFragment] start 或 end 必须为无符号的安全的整数',
                {
                    cause: { start, end, path, options }
                }
            );
        }

        // 如果不需要读取内容，则直接返回空字符串
        if (isZero(end) || start === end) {
            return resolve('');
        }

        let data = '';

        const stream = createReadStream(path, {
            start,
            end,
            encoding: 'utf8',
            autoClose: true
        });

        stream.on('error', error => {
            throw new Error('[readFragment] 文件读取失败', {
                cause: { path, options, error }
            });
        });

        stream.on('data', chunk => {
            if (firstLine) {
                return chunk;
            }

            return (data += chunk);
        });

        stream.on('end', () => resolve(data));
    });
}

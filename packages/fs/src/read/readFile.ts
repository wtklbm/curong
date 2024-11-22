import { PathLike, promises } from 'fs';

import type { ReadFileOptions } from './types';

/**
 * 将文件的内容读取为指定格式的字符串
 *
 * @param filePath 文件的路径或文件的内容
 * @param options 配置对象
 *  - `encoding` 文件的编码，默认 `utf8`
 *  - `flag` 标识，默认 `r+`
 *  - `mode` 模式，默认为 `0o755`
 * @returns 返回读取到的文件的内容字符串
 * @throws 如果文件读取失败，则会抛出异常
 * @note
 *  - 在调用 `readFile()` 之前，请勿使用 `access()` 检查文件的可访问性。
 *   这样做会引入竞态条件，因为其他进程可能会在两次调用之间更改文件的状态。
 *   相反，用户代码应该直接 `read` 文件并处理文件不可访问时引发的错误。
 */
export default async function readFile(
    filePath: PathLike,
    options?: ReadFileOptions
): Promise<string> {
    options = { encoding: 'utf8', flag: 'r+', mode: 0o755, ...options };

    return promises.readFile(filePath, options).catch(error => {
        throw new Error('文件读取失败', {
            cause: { function: 'readFile', filePath, options, error }
        });
    }) as unknown as string;
}

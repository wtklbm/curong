import { promises } from 'fs';
import { dirname } from 'path';

import mkdir from '../create/mkdir';

import type { WriteFileOptions } from './types';

/**
 * 将数据写入到文件
 *
 * @param filePath 文件的路径 `绝对路径`
 * @param data 要写入的数据，对象默认换为JSON
 * @param options 配置选项
 *  - `encoding` 文件的编码，默认为 `utf8`
 *  - `flag` 读写文件标识符，默认为 `w+`
 *  - `isMkdir` 当目录不存在时，是否自动创建目录，然后在从该目录下写文件, 默认为 `true`
 *  - `mode` 权限，默认为 `0o755`
 * @throws
 *  - 如果将 `data` 转换为 `JSON` 时失败，则会抛出异常
 *  - 如果创建文件夹失败，则会抛出异常
 *  - 如果写入文件失败，则会抛出异常
 * @note
 * - 如果要频繁的操作同一个文件，请使用 `Writer` 类
 * - 在调用 `writeFile()` 之前，请勿使用 `access()` 检查文件的可访问性。
 *   这样做会引入竞态条件，因为其他进程可能会在两次调用之间更改文件的状态。
 *   相反，用户代码应该直接 `write` 文件并处理文件不可访问时引发的错误。
 */
export default async function writeFile(
    filePath: string,
    data: any,
    options?: WriteFileOptions
): Promise<void> {
    options = {
        encoding: 'utf8',
        flag: 'w+',
        mode: 0o755,
        isMkdir: false,
        ...options
    };

    // 如果是自动创建目录
    if (options.isMkdir) {
        await mkdir(dirname(filePath)).catch(error => {
            throw new Error('[writeFile] 创建父级目录失败', {
                cause: { filePath, data, options, error }
            });
        });
    }

    return await promises.writeFile(filePath, data, options).catch(error => {
        throw new Error('[writeFile] 写入文件失败', {
            cause: { filePath, data, options, error }
        });
    });
}

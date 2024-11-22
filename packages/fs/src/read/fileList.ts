import { Dirent, promises } from 'fs';
import { extname, join } from 'path';

import readLnk from './readLnk';
import type { FileListOptions } from './types';

/**
 * 获取一个文件夹的所有文件列表
 *
 * 支持从 Windows 快捷方式(`lnk`) 中读取目录或文件
 *
 * @param dirName 文件夹目录
 * @param options 配置选项
 *  - `depthOnce` 是否只获取一层深度的数据，默认为 `false`
 * @return 返回一个包含文件名的列表
 * @throws 如果读取文件夹失败，则会抛出异常
 * @note
 *  - 在调用 `fileList()` 之前，请勿使用 `access()` 检查文件的可访问性。
 *   这样做会引入竞态条件，因为其他进程可能会在两次调用之间更改文件的状态。
 *   相反，用户代码应该直接 `read` 文件并处理文件不可访问时引发的错误。
 * @todo 将参数变为一个 `options`： { ignored = '', depth = 0 }
 */
export default async function fileList(
    dirName: string,
    options?: FileListOptions
): Promise<Array<string>> {
    const { depthOnce = false } = options ?? {};

    const files: Array<string> = [];
    const dirents: Array<Dirent> | void = await promises
        .readdir(dirName, {
            encoding: 'utf8',
            withFileTypes: true
        })
        .catch(error => {
            throw new Error('读取文件夹失败', {
                cause: { function: 'fileList', dirName, options, error }
            });
        });

    if (!dirents?.length) {
        return files;
    }

    for (let i = 0, len = dirents.length; i < len; i++) {
        const dirent: Dirent = dirents[i];
        const { name } = dirent;

        if (depthOnce) {
            files.push(name);
            continue;
        }

        const absolutePath: string = join(dirName, name);

        // 如果是一个Windows的快捷方式
        if (extname(absolutePath) === '.lnk') {
            const targetPath = await readLnk(absolutePath).catch(() => null);
            if (!targetPath) continue;

            if (extname(targetPath) === '') {
                // 如果是文件夹
                files.push(...(await fileList(targetPath)));
            } else {
                // 不是文件夹，那么就是文件了
                files.push(targetPath);
            }

            continue;
        }

        // 是文件夹
        if (dirent.isDirectory()) {
            files.push(...(await fileList(absolutePath)));
        } else {
            files.push(absolutePath);
        }
    }

    return files;
}

import { join, extname } from 'path';
import { promises, Dirent } from 'fs';

import { format } from '@curong/term';

import readLnk from './readLnk';

import { FileListOptions } from './types/fileList';

/**
 * 获取一个文件夹的所有文件名的列表
 * 支持从 Windows 快捷方式(`lnk`) 中读取目录或文件
 *
 * @todo 将参数变为一个 `options`： { ignored = '', depth = 0 }
 * @param {string} dirName 文件夹目录
 * @return 返回一个包含文件名的列表
 * @throws
 *
 * - 如果读取文件夹失败，则会抛出异常
 */
export default async function fileList(
    dirName: string,
    options?: FileListOptions
): Promise<Array<string>> {
    const { depthOnce = false } = options || {};

    const files: Array<string> = [];
    const dirents: Array<Dirent> | void = await promises
        .readdir(dirName, {
            encoding: 'utf8',
            withFileTypes: true
        })
        .catch(error => {
            throw format({
                name: 'readdir',
                message: '读取文件夹失败',
                data: { dirName, options, error }
            });
        });

    if (!dirents || !dirents.length) return files;

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

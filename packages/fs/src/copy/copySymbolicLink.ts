import { symlink } from 'fs/promises';
import { dirname } from 'path';

import mkdir from '../create/mkdir';
import isDir from '../is/isDir';
import isFile from '../is/isFile';
import isSymbolicLink from '../is/isSymbolicLink';

/**
 * 将一个符号链接拷贝到另一个路径
 *
 * @param fromPath 符号链接地址
 * @param toPath 目标路径
 * @throws
 *
 * - 如果要拷贝的内容不是符号链接则抛出异常
 * - 如果拷贝符号链接失败则抛出异常
 */
export default async function copySymbolicLink(
    fromPath: string,
    toPath: string
): Promise<void> {
    // 如果要拷贝的内容不是符号链接
    if (!(await isSymbolicLink(fromPath))) {
        throw new TypeError('[copySymbolicLink] fromPath 不是一个符号链接', {
            cause: { fromPath, toPath }
        });
    }

    const toDir = dirname(toPath);
    let type: string | null;

    // 先判断目标文件夹存不存在
    await mkdir(toDir).catch(() => {});

    // 判断符号链接的类型
    if (await isFile(fromPath)) {
        type = 'file';
    } else if (await isDir(fromPath)) {
        type = 'dir';
    } else {
        type = null;
    }

    // 创建符号链接
    await symlink(fromPath, toPath, type).catch(error => {
        throw new Error(
            '[copySymbolicLink] 拷贝符号链接失败，无法将 fromPath 拷贝到 toPath',
            {
                cause: { fromPath, toPath, error }
            }
        );
    });
}

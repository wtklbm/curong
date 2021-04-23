import { dirname } from 'path';
import { symlink } from 'fs/promises';

import { format } from '@curong/term';

import isDir from './isDir';
import mkdir from './mkdir';
import isFile from './isFile';
import isSymbolicLink from './isSymbolicLink';

const name = 'copySymbolicLink';

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
        throw format({
            name,
            message: 'fromPath不是一个符号链接',
            data: { fromPath, toPath }
        });
    }

    const toDir = dirname(toPath);
    let type: string | null;

    // 先判断目标文件夹存不存在
    if (!(await isDir(toDir))) {
        await mkdir(toDir);
    }

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
        throw format({
            name,
            message: '拷贝符号链接失败，无法将fromPath拷贝到toPath',
            data: { fromPath, toPath, error }
        });
    });
}

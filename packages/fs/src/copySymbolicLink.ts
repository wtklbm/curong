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
 * @param from 符号链接地址
 * @param to 目标路径
 * @throws
 *
 * - 如果要拷贝的内容不是符号链接则抛出异常
 * - 如果拷贝符号链接失败则抛出异常
 */
export default async function copySymbolicLink(from: string, to: string) {
    // 如果要拷贝的内容不是符号链接
    if (!(await isSymbolicLink(from))) {
        throw format({
            name,
            message: 'from不是一个符号链接',
            data: { from, to }
        });
    }

    const toDir = dirname(to);
    let type: string | null;

    // 先判断目标文件夹存不存在
    if (!(await isDir(toDir))) {
        await mkdir(toDir);
    }

    // 判断符号链接的类型
    if (await isFile(from)) {
        type = 'file';
    } else if (await isDir(from)) {
        type = 'dir';
    } else {
        type = null;
    }

    // 创建符号链接
    await symlink(from, to, type).catch(error => {
        throw format({
            name,
            message: '拷贝符号链接失败，无法将from拷贝到to',
            data: { from, to, error }
        });
    });
}

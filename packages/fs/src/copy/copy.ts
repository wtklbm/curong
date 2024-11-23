import { copyFile, lstat, readdir } from 'fs/promises';
import { dirname, join } from 'path';

import mkdir from '../create/mkdir';
import isDir from '../is/isDir';
import isFile from '../is/isFile';
import readSymbolicLink from '../read/readSymbolicLink';

import copySymbolicLink from './copySymbolicLink';
import type { CopyFileOptions } from './types';

const _copyFile = async (from: string, to: string, forcibly = false) => {
    // 如果目标文件已经存在，并且我们不想强制写入
    if ((await isFile(to)) && !forcibly) {
        return;
    }

    // 在拷贝文件之前，先判断父文件夹存不存在
    await mkdir(dirname(to)).catch(() => {});

    return await copyFile(from, to).catch(error => {
        throw new Error('[copy] 拷贝文件失败，无法将 from 拷贝到 to', {
            cause: { from, to, forcibly, error }
        });
    });
};

/**
 * 将内容从 `fromPath` 拷贝到 `toPath`
 *
 * @param fromPath 可能是文件、文件夹或符号链接
 * @param toPath 可能是文件、文件夹或符号链接
 * @param options 配置选项
 *  - `forcibly`: 如果文件已存在时是否强制覆盖，默认为 `true`
 * @throws
 *  - 如果 `fromPath` 不是文件、文件夹、符号链接则会抛出异常
 *  - 如果 `toPath` 名被占用且 `toPath` 不是文件夹则会抛出异常
 *  - 如果读取文件夹失败则会抛出异常
 *  - 如果拷贝文件失败则会抛出异常
 *  - 如果拷贝符号链接失败则会抛出异常
 */
export default async function copy(
    fromPath: string,
    toPath: string,
    options: CopyFileOptions = {}
): Promise<void> {
    const { forcibly = true } = options;
    let link: string | null;

    // 如果源是符号链接
    if ((link = await readSymbolicLink(fromPath))) {
        return await copySymbolicLink(link, toPath);
    }

    // 如果源是文件
    if (await isFile(fromPath)) {
        return await _copyFile(fromPath, toPath, forcibly);
    }

    // 如果源不是一个文件夹
    if (!(await isDir(fromPath))) {
        throw new TypeError('[copy] fromPath 不是一个文件或文件夹', {
            cause: { fromPath, toPath, options }
        });
    }

    const toPathStat = await lstat(toPath).catch(() => null);

    // 如果目标名已经被占用并且目标不是一个文件夹
    if (toPathStat && !toPathStat.isDirectory()) {
        throw new TypeError('[copy] toPath 已经存在，并且不是一个目录', {
            cause: { fromPath, toPath, options }
        });
    }

    // 先判断目标文件夹存不存在
    await mkdir(toPath).catch(() => {});

    //# 如果是文件夹

    const paths = await readdir(fromPath).catch(error => {
        throw new Error('[copy] 读取 fromPath 文件夹失败', {
            cause: { fromPath, toPath, options, error }
        });
    });

    let path: string;
    let from: string;
    let to: string;

    for (let i = 0, len = paths.length; i < len; i++) {
        path = paths[i];
        from = join(fromPath, path);
        to = join(toPath, path);

        if ((link = await readSymbolicLink(fromPath))) {
            await copySymbolicLink(link, to);
        } else if (await isFile(from)) {
            await _copyFile(from, to, forcibly);
        } else if (await isDir(from)) {
            await copy(from, to);
        } else {
            throw new Error(
                '[copy] 无法将 from 拷贝到 to，from 不是一个文件、文件夹或符号链接',
                {
                    cause: { fromPath, toPath, options, from, to }
                }
            );
        }
    }
}

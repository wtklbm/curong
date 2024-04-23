import { promises, MakeDirectoryOptions } from 'fs';

import { format } from '@curong/term';

/**
 * 创建一个文件夹
 *
 * @param dirPath 要创建的路径，必须是`绝对路径`
 * @param options 参数对象
 *
 * 包括:
 * - `recursive` 指示是否应创建父文件夹，默认为 `true`
 * - `mode` 权限，默认为 `0o644`
 *
 * @throws
 *
 * - 如果 `dirPath` 不是有效路径，则会抛出异常
 * - 如果根据 `dirPath` 创建文件夹失败，则会爬出异常
 */
export default async function mkdir(
    dirPath: string,
    options?: MakeDirectoryOptions
): Promise<string | undefined> {
    options = {
        recursive: true,
        mode: 0o644,
        ...options
    };

    return await promises.mkdir(dirPath, options).catch(error => {
        throw format({
            name: 'mkdir',
            message: '创建目录失败',
            data: { dirPath, options, error }
        });
    });
}

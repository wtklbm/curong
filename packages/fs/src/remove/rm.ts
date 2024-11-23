import type { PathLike } from 'fs';
import { rmdir, unlink } from 'fs/promises';

import isDir from '../is/isDir';
import isFile from '../is/isFile';

/**
 * 删除一个文件或一个文件夹
 *
 * @param path 要删除的文件或文件夹路径
 * @throws
 *
 * - 如果 `path` 不是一个有效路径，则会抛出异常
 */
export default async function rm(path: PathLike): Promise<void> {
    if (await isDir(path)) {
        return await rmdir(path, { recursive: true });
    }

    if (await isFile(path)) {
        return await unlink(path);
    }

    throw new TypeError('[rm] path 不是一个文件或文件夹', {
        cause: { path }
    });
}

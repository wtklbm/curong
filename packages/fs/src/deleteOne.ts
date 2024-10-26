import type { PathLike } from 'fs';
import { rmdir, unlink } from 'fs/promises';

import { format } from '@curong/term';

import isDir from './isDir';
import isFile from './isFile';

/**
 * 删除一个文件或一个文件夹
 *
 * @param path 要删除的文件或文件夹路径
 * @throws
 *
 * - 如果 `path` 不是一个有效路径，则会抛出异常
 */
export default async function deleteOne(path: PathLike): Promise<void> {
    if (await isDir(path)) {
        return await rmdir(path, { recursive: true });
    }

    if (await isFile(path)) {
        return await unlink(path);
    }

    throw format({
        name: 'deleteOne',
        message: 'path 不是一个有效路径',
        data: { path }
    });
}

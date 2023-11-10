import { unlink, rmdir } from 'fs/promises';

import { format } from '@curong/term';

import isDir from './isDir';
import isFile from './isFile';

/**
 * 删除一个文件或一个文件夹
 *
 * @param pathString 要删除的文件或文件夹路径
 * @throws
 *
 * - 如果 `pathString` 不是一个有效路径，则会抛出异常
 */
export default async function deleteOne(pathString: string): Promise<void> {
    if (await isDir(pathString)) {
        return await rmdir(pathString, { recursive: true });
    }

    if (await isFile(pathString)) {
        return await unlink(pathString);
    }

    throw format({
        name: 'deleteOne',
        message: 'pathString不是一个有效路径',
        data: { pathString }
    });
}

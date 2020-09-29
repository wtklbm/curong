import { promises } from 'fs';

import isDir from './isDir';
import isFile from './isFile';
import { format } from '@curong/term';

const { unlink, rmdir } = promises;

/**
 * 删除一个文件或一个文件夹
 *
 * @param pathString 要删除的文件或文件夹路径
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

import { join } from 'path';

import { format } from '@curong/term';

import isDir from './isDir';
import fileList from './fileList';
import deleteOne from './deleteOne';

/**
 * 清空一个文件夹
 *
 * @param pathString 要清空的文件夹的路径
 * @throws
 *
 * - 如果 `pathString` 不是一个有效的文件夹路径，则会抛出异常
 */
export default async function clearDir(pathString: string): Promise<void> {
    if (!(await isDir(pathString))) {
        throw format({
            name: 'clearDir',
            message: 'pathString不是一个有效的文件夹路径',
            data: { pathString }
        });
    }

    const files = await fileList(pathString, { depthOnce: true });
    let item;

    while ((item = files.shift())) {
        await deleteOne(join(pathString, item));
    }
}

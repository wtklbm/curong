import { join } from 'path';

import isDir from '../is/isDir';
import readDir from '../read/readDir';

import rm from './rm';

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
        throw new TypeError('[clearDir] pathString 不是一个有效的文件夹路径', {
            cause: { pathString }
        });
    }

    const files = await readDir(pathString, { depthOnce: true });
    let item;

    while ((item = files.shift())) {
        await rm(join(pathString, item));
    }
}

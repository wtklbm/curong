import { Dirent, promises } from 'fs';
import { extname, join } from 'path';

import { format } from '@curong/term';
import { isArrayFilled, isStringFilled } from '@curong/types';

import readLnk from './readLnk';

/**
 * 从一个文件夹中查找指定的文件夹
 *
 * @param pathString 当前的文件夹
 * @param folders 要查找的文件夹的名字的数组
 * @param data 要返回的结果都可以向里面存，参数必须传递
 */
async function findDirCall(
    pathString: string,
    folders: string[],
    data: string[]
): Promise<string[]> {
    const files: Array<string> = [];
    const dirents: Array<Dirent> | null = await promises
        .readdir(pathString, {
            encoding: 'utf8',
            withFileTypes: true
        })
        .catch(() => null);

    if (!isArrayFilled(dirents)) {
        return files;
    }

    for (let i: number = 0, len: number = dirents.length; i < len; i++) {
        const dirent: Dirent = dirents[i];
        const name: string = dirent.name;
        const absolutePath: string = join(pathString, name);

        // 如果是文件夹
        if (dirent.isDirectory()) {
            if (folders.includes(name)) {
                data.push(absolutePath);
                continue;
            }

            files.push(...(await findDirCall(absolutePath, folders, data)));

            continue;
        }

        // 如果是一个Windows的快捷方式
        if (extname(absolutePath) === '.lnk') {
            const targetPath = await readLnk(absolutePath).catch(() => null);
            if (!targetPath) continue;

            if (extname(targetPath) === '') {
                // 如果是文件夹
                files.push(...(await findDirCall(targetPath, folders, data)));
            } else {
                // 不是文件夹，那么就是文件了
                files.push(targetPath);
            }

            continue;
        }
    }

    return files;
}

/**
 * 从一个文件夹中查找指定的文件夹
 *
 * @param pathString 当前的文件夹
 * @param folders 要查找的文件夹的名字的数组，默认为 `[]`
 * @throws
 *
 * - 如果 `pathString` 为空字符串，则会抛出异常
 */
export default async function findDir(
    pathString: string,
    folders: string | string[] = []
): Promise<string[]> {
    const pathStrings: string[] = [];

    if (!isStringFilled(pathString)) {
        throw format({
            name: 'findDir',
            message: 'pathString不是一个包含内容的字符串',
            data: { pathString }
        });
    }

    if (isStringFilled(folders)) {
        folders = [folders];
    }

    await findDirCall(pathString, folders, pathStrings);

    return pathStrings;
}

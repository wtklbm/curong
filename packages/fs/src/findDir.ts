import { join, extname } from 'path';
import { promises, Dirent } from 'fs';

import { isArrayHave, isStringHave } from '@curong/types';

import readLnk from './readLnk';

/**
 * 从一个文件夹中查找指定的文件夹
 *
 * @param pathString 当前的文件夹
 * @param folders 要查找的文件夹的名字的数组
 * @param data 要返回的结果都可以向里面存，参数必须传递
 */
export default async function findDir(
    pathString: string,
    folders: string | string[] = [],
    data: string[]
): Promise<string[]> {
    const files: Array<string> = [];

    if (isStringHave(folders)) {
        folders = [folders];
    }

    const dirents: Array<Dirent> | null = await promises
        .readdir(pathString, {
            encoding: 'utf8',
            withFileTypes: true
        })
        .catch(() => null);

    if (!isArrayHave(dirents)) return files;

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

            files.push(...(await findDir(absolutePath, folders, data)));

            continue;
        }

        // 如果是一个Windows的快捷方式
        if (extname(absolutePath) === '.lnk') {
            const targetPath = await readLnk(absolutePath).catch(() => null);
            if (!targetPath) continue;

            if (extname(targetPath) === '') {
                // 如果是文件夹
                files.push(...(await findDir(targetPath, folders, data)));
            } else {
                // 不是文件夹，那么就是文件了
                files.push(targetPath);
            }

            continue;
        }
    }

    return files;
}

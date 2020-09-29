import { promises, MakeDirectoryOptions } from 'fs';

import { isStringHave } from '@curong/types';
import { format } from '@curong/term';

/**
 * 创建一个文件夹
 *
 * @param dirPath 要创建的路径，必须是`绝对路径`
 * @param options 参数对象
 *
 * 包括:
 * - `recursive` 指示是否应创建父文件夹，默认为 `true`
 * - `mode` 权限，默认为 `0o777`
 * @throws 如果参数错误或创建失败会触发 `throw`
 */
export default async function mkdir(
    dirPath: string,
    options?: MakeDirectoryOptions
): Promise<string | undefined> {
    options = {
        recursive: true,
        mode: 0o777,
        ...options
    };

    if (!isStringHave(dirPath)) {
        throw format({
            name: 'mkdir',
            message: '参数错误',
            data: { dirPath, options }
        });
    }

    return await promises.mkdir(dirPath, options).catch(error => {
        throw format({
            name: 'mkdir',
            message: '创建目录失败',
            data: { dirPath, options, error }
        });
    });
}

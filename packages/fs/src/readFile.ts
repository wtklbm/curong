import { promises, PathLike } from 'fs';

import { isStringHave } from '@curong/types';
import { format } from '@curong/term';

import { ReadFileOptions } from './types/readFile';

/**
 * 将文件的内容读取为指定格式的字符串
 *
 * @param filePath 文件的路径或文件的内容
 * @param options 配置对象
 *
 * - `encoding` 文件的编码，默认 `utf8`
 * - `flag` 标识，默认 `r+`
 * - `mode` 模式，默认为 `0o777`
 *
 * @returns 返回读取到的文件的内容字符串
 */

export default async function readFile(
    filePath: PathLike,
    options?: ReadFileOptions
): Promise<string> {
    if (!isStringHave(filePath)) {
        throw format({
            name: 'readFile',
            message: '参数错误',
            data: { filePath, options }
        });
    }

    options = { encoding: 'utf8', flag: 'r+', mode: 0o777, ...options };

    return ((await promises.readFile(filePath, options).then(
        buffer => buffer,
        error => {
            throw format({
                name: 'readFile',
                message: `读取文件失败\n${error}`,
                data: { filePath, options }
            });
        }
    )) as unknown) as string;
}

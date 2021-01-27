import { promises } from 'fs';
import { dirname } from 'path';

import { isObjectHave, isArrayHave } from '@curong/types';
import { format } from '@curong/term';

import mkdir from './mkdir';
import { WriteFileOptions } from './types/writeFile';

/**
 * 将数据写入到文件
 *
 * @param filePath 文件的路径 `绝对路径`
 * @param data 要写入的数据，对象默认换为JSON
 * @param options 配置选项
 *
 * - `encoding` 文件的编码，默认为 `utf8`
 * - `flag` 读写文件标识符，默认为 `w+`
 * - `isFormat` 是否把对象和数组进行序列化，序列化之后会将数据转换为 `JSON` 格式，默认为 `true`
 * - `isMkdir` 当目录不存在时，是否自动创建目录，然后在从该目录下写文件, 默认为 `true`
 * - `mode` 权限，默认为 `0o777`
 *
 * @throws
 *
 * - 如果将 `data` 转换为 `JSON` 时失败，则会抛出异常
 * - 如果创建文件夹失败，则会抛出异常
 * - 如果写入文件失败，则会抛出异常
 */
export default async function writeFile(
    filePath: string,
    data: any,
    options?: WriteFileOptions
): Promise<void> {
    options = {
        encoding: 'utf8',
        flag: 'w+',
        mode: 0o777,
        isMkdir: false,
        isFormat: true,
        ...options
    };

    if (options.isFormat) {
        // 如果 `data` 是对象，就把对象转换为 `JSON` 格式
        if (isObjectHave(data) || isArrayHave(data)) {
            try {
                data = JSON.stringify(data);
            } catch (error) {
                throw format({
                    name: 'writeFile',
                    message: '数据序列化失败，无法转换为 `JSON` 格式',
                    data: { data, error }
                });
            }
        }
    }

    // 如果是自动创建目录
    if (options.isMkdir) {
        await mkdir(dirname(filePath)).catch((error: Error) => {
            throw format({
                name: 'writeFile',
                message: '创建目录失败',
                data: { filePath, error }
            });
        });
    }

    return await promises.writeFile(filePath, data, options).then(
        data => data,
        error => {
            throw format({
                name: 'writeFile',
                message: '写文件失败',
                data: { filePath, data, options, error }
            });
        }
    );
}

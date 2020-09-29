import { promises } from 'fs';
import { dirname } from 'path';

import { isStringHave, isObjectHave, isArrayHave } from '@curong/types';
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
 * - `mode` 权限，默认为 `0o777`
 * - `flag` 读写文件标识符，默认为 `w+`
 * - `isMkdir` 当目录不存在时，是否自动创建目录，然后在从该目录下写文件, 默认为 `true`
 * - `isFormat` 是否把对象和数组进行序列化，序列化之后会将数据转换为 `JSON` 格式，默认为 `true`
 *
 * @return 没有返回值
 */
export default async function writeFile(
    filePath: string,
    data: any,
    options?: WriteFileOptions
): Promise<void> {
    if (!isStringHave(filePath)) {
        throw format({
            name: 'writeFile',
            message: '参数错误',
            data: { filePath, data, options }
        });
    }

    options = {
        encoding: 'utf8',
        flag: 'w+',
        mode: 0o777,
        isMkdir: false,
        isFormat: true,
        ...options
    };

    if (options.isFormat) {
        // 如果data是对象，就把对象转换为JSON格式
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

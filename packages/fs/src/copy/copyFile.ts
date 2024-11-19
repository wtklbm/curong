import { promises } from 'fs';

import { format } from '@curong/term';
import { isTrue } from '@curong/types';

import diffFile from '../diff/diffFile';
import destPath from '../move/destPath';
import rm from '../remove/rm';

import type { CopyFileOptions } from './types';

/**
 * 把一个文件，从一个目录拷贝到另一个目录中
 *
 * @param filePath 当前文件的路径，这个是绝对路径(有文件名和后缀)
 * @param srcDir 源文件夹，为了实现多级复制，所以传递了来源(不包含文件名和后缀)
 * @param desDir 目标文件夹(不包含文件名和后缀)
 * @param options
 *
 * - `forcibly` 是否强制写入，默认为 `true`
 *
 * @return 如果出错，则控制台返回一个错误消息，否则返回复制好后的该文件的绝对路径
 * @throws
 *
 * - 如果没有找到当前路径所对应的绝对路径，则会抛出异常
 * - 如果拷贝文件失败，则会抛出异常
 */
export default async function copyFile(
    filePath: string,
    srcDir: string,
    desDir: string,
    options?: CopyFileOptions
): Promise<string> {
    options = { forcibly: true, ...options };

    const name = 'copyFile';
    const destString: string = await destPath(filePath, srcDir, desDir, {
        isMakeDir: true
    }).catch((error: Error) => {
        throw format({
            name,
            message: '获取路径失败',
            data: { filePath, srcDir, desDir, error }
        });
    });

    // 进行大小匹配，如果路径不存在或大小匹配不上，则创建该文件
    if (!(await diffFile(filePath, destString))) {
        try {
            await promises.copyFile(filePath, destString);
        } catch (error) {
            if (isTrue(options.forcibly)) {
                await rm(filePath);

                return await copyFile(filePath, srcDir, desDir, {
                    forcibly: false
                });
            }

            throw format({
                name,
                message: '拷贝文件失败',
                data: { filePath, destPath: destString, srcDir, desDir, error }
            });
        }
    }

    return Promise.resolve(destString);
}

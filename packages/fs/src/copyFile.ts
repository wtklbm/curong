import { promises } from 'fs';

import { isTrue } from '@curong/types';
import { format } from '@curong/term';

import diffFile from './diffFile';
import destPath from './destPath';
import deleteOne from './deleteOne';

import { CopyFileOptions } from './types/copyFile';

/**
 * 把一个文件，从一个目录拷贝到另一个目录中
 *
 * @param filePath 当前文件的路径，这个是绝对路径(有文件名和后缀)
 * @param srcDir 源文件夹，为了实现多级复制，所以传递了来源(不包含文件名和后缀)
 * @param desDir 目标文件夹(不包含文件名和后缀)
 * @return 如果出错，则控制台返回一个错误消息，否则返回复制好后的该文件的绝对路径
 * @throws 如果参数错误或没有找到绝对路径会抛出异常
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
            if (isTrue(options!.forcibly)) {
                await deleteOne(filePath);

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

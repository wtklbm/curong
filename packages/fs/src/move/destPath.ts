import { promises } from 'fs';
import { dirname, isAbsolute, join, normalize, relative } from 'path';

import { isStringFilled } from '@curong/types';

import mkdir from '../create/mkdir';
import isDir from '../is/isDir';
import readLnk from '../read/readLnk';

import type { DestPathOptions } from './types';

/**
 * 获取目标路径和目标文件夹
 *
 * @bug 此方法目前还不支持 `macOS` 和 `Linux`
 * @param filePath 当前文件的路径，这个是绝对路径(有文件名和后缀)
 * @param srcDir 源文件夹，为了实现多级复制，所以传递了来源(不包含文件名和后缀)
 * @param desDir 目标文件夹(不包含文件名和后缀)
 * @param options  配置参数
 *  - `isMakeDir` 是否自动创建目标文件夹，默认为 `false`
 * @return 返回该文件的相当于目标文件夹的路径
 * @throws
 *  - 如果 `filePath` 为空字符串，则会抛出异常
 *  - 如果 `srcDir` 为空字符串，则会抛出异常
 *  - 如果 `desDir` 为空字符串，则会抛出异常
 */
export default async function destPath(
    filePath: string,
    srcDir: string,
    desDir: string,
    options: DestPathOptions = {}
): Promise<string> {
    const { isMakeDir = false } = options;

    if (
        !isStringFilled(filePath) ||
        !isStringFilled(srcDir) ||
        !isStringFilled(desDir)
    ) {
        throw new TypeError(
            '[destPath] filePath、srcDir 或者 desDir 必须为非空字符串',
            {
                cause: { filePath, srcDir, desDir, options }
            }
        );
    }

    // 进行路径格式化操作
    filePath = normalize(filePath);
    srcDir = normalize(srcDir);
    desDir = normalize(desDir);

    let destPath = '';

    // 有可能是通过系统的快捷方式访问的软连接和或硬链接
    if (!filePath.includes(srcDir)) {
        // 重新读取该文件夹下的文件或目录，并且遍历它
        const pathList: string[] = await promises.readdir(srcDir);

        for (let i = 0, len = pathList.length; i < len; i++) {
            const p: string = pathList[i];
            // 如果没有找到 Windows 快捷方式
            if (!p.endsWith('.lnk')) continue;

            // 解析路径
            const targetPath = await readLnk(join(srcDir, p)).catch(() => null);
            if (!targetPath) continue;

            // 目标文件夹 + 当前快捷方式的名字 + 相对路径 = 最终的路径(包含文件名和后缀)
            return join(
                desDir,
                // 快捷方式的名字(已经删除了".lnk")
                p.slice(0, p.lastIndexOf('.')),
                // 获取相对路径
                relative(targetPath, filePath)
            );
        }
    }

    // 拼接相对路径，如果拼接失败则会返回绝对路径(filePath)
    const resolvePath = relative(srcDir, filePath);

    // 如果是绝对路径
    if (isAbsolute(resolvePath)) {
        return Promise.resolve(filePath);
    }

    // 拿到相对路径然后做拼接
    destPath = join(desDir, resolvePath);

    if (isMakeDir) {
        const destDir = dirname(destPath);
        // 如果目录不存在则创建目录
        (await isDir(destDir)) || (await mkdir(destDir));
    }

    return destPath;
}

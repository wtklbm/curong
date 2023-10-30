import { stat } from 'fs/promises';

/**
 * 是不是一个文件夹
 *
 * @param {string} pathString 要验证的路径的字符串
 * @returns 如果是文件则返回 `true`，否则为 `false`
 */
export default async function isDir(pathString: string): Promise<boolean> {
    return await stat(pathString).then(
        stat => stat.isDirectory(),
        () => false
    );
}

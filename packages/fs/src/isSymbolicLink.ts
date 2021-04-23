import { promises } from 'fs';

/**
 * 是不是一个符号链接
 *
 * @param {string} pathString 要验证的路径的字符串
 * @returns 如果是符号链接则返回 `true`，否则为 `false`
 */
export default async function isSymbolicLink(
    pathString: string
): Promise<boolean> {
    return await promises.stat(pathString).then(
        stat => stat.isSymbolicLink(),
        () => false
    );
}

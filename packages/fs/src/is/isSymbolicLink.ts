import type { PathLike } from 'fs';
import { lstat } from 'fs/promises';

/**
 * 是不是一个符号链接
 *
 * @param path 要验证的路径的字符串、URL、Buffer
 * @returns 如果是符号链接则返回 `true`，否则为 `false`
 */
export default async function isSymbolicLink(path: PathLike): Promise<boolean> {
    return await lstat(path).then(
        stat => stat.isSymbolicLink(),
        () => false
    );
}

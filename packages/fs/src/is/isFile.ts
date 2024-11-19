import type { PathLike } from 'fs';
import { stat } from 'fs/promises';

/**
 * 是不是一个文件
 *
 * @param path 要验证的路径的字符串、URL、Buffer
 * @returns 如果是文件则返回 `true`，否则为 `false`
 */
export default async function isFile(path: PathLike): Promise<boolean> {
    return await stat(path).then(
        stat => stat.isFile(),
        () => false
    );
}

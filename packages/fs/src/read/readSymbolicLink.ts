import type { PathLike } from 'fs';
import { readlink } from 'fs/promises';

/**
 * 读取符号链接所指向的原始地址
 *
 * @param path 符号链接字符串、URL、Buffer
 * @returns 如果找到符号链接，则返回符号链接的源路径，否则返回 `null`
 * @note
 *  - 在调用 `readSymbolicLink()` 之前，请勿使用 `access()` 检查文件的可访问性。
 *   这样做会引入竞态条件，因为其他进程可能会在两次调用之间更改文件的状态。
 *   相反，用户代码应该直接 `read` 文件并处理文件不可访问时引发的错误。
 */
export default async function readSymbolicLink(
    path: PathLike
): Promise<string | null> {
    return await readlink(path).catch(() => null);
}

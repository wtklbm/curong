import { readlink } from 'fs/promises';

/**
 * 获取符号链接所指向的原始地址
 *
 * @param pathString 符号链接地址
 * @returns 如果找到符号链接，则返回符号链接的源路径，否则返回 `null`
 */
export default async function symbolicLink(
    pathString: string
): Promise<string | null> {
    return await readlink(pathString).catch(() => null);
}

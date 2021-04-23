import { readlink } from 'fs/promises';

/**
 * 获取符号链接所指向的原始地址
 *
 * @param pathString 符号链接地址
 * @returns 返回找到的符号链接的源路径
 */
export default async function symbolicLink(pathString: string) {
    return await readlink(pathString).catch(() => null);
}

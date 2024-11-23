import type { PathLike } from 'fs';
import { rename } from 'fs/promises';

/**
 * 将文件或文件夹移动到新的位置
 *
 * @param oldPath 源文件路径，可以是字符串、URL、Buffer
 * @param newPath 目标文件路径，可以是字符串、URL、Buffer
 * @throws 如果移动失败，则会抛出异常
 */
export default async function move(
    oldPath: PathLike,
    newPath: PathLike
): Promise<void> {
    await rename(oldPath, newPath).catch(error => {
        throw new Error('[move] 移动文件或文件夹失败', {
            cause: { oldPath, newPath, error }
        });
    });
}

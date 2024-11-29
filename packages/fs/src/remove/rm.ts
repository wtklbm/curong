import type { PathLike, RmOptions } from 'fs';
import { rm as originRm } from 'fs/promises';

/**
 * 删除一个文件或一个文件夹
 *
 * @param path 要删除的文件或文件夹路径
 * @param options 配置选项
 *  - `force`: 当 `true` 时，如果 `path` 不存在，异常将被忽略。默认为 `false`
 *  - `maxRetries`: 如果遇到 `EBUSY`、`EMFILE`、`ENFILE`、`ENOTEMPTY` 或 `EPERM` 错误，
 *    Node.js 将重试该操作，每次尝试时线性退避等待时间延长 `retryDelay` 毫秒。
 *    该选项代表重试次数。如果 `recursive` 选项不是 `true`，则忽略此选项。
 *    默认为 `0`
 *  - `recursive`: 是否递归删除目录。默认为 `true`。在递归模式下，操作失败时会重试
 *  - `retryDelay`: 重试之间等待的时间 (以毫秒为单位)
 *     如果 `recursive` 选项不是 `true`，则忽略此选项。
 * @throws 如果删除失败，则会抛出异常
 */
export default async function rm(
    path: PathLike,
    options?: RmOptions
): Promise<void> {
    options = { recursive: true, ...options };

    return await originRm(path, options).catch(error => {
        throw new TypeError('[rm] 无法删除文件或目录', {
            cause: { path, options, error }
        });
    });
}

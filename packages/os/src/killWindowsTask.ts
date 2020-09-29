import { exec } from '@curong/process';

/**
 * 结束一个正在运行的 `Windows` 系统平台上的映像进程
 *
 * @param imageName 要结束的映像名称(包含 `.exe` 后缀扩展名，比如 `cmd.exe`)
 * @returns 如果进程正确退出则返回 `true`，否则为 `false`。
 * 返回 `false` 的情况还有可能是因为没有找到当前要结束的那个进程。
 */
export default async function killWindowsTask(
    imageName: string
): Promise<boolean> {
    const command = ['taskkill', '/F', '/T', '/IM', `"${imageName}"`];
    const executed = await exec(command).catch(() => ({ stderr: 'error' }));

    return executed.stderr.length > 0;
}

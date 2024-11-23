import { exec } from 'child_process';
import { normalize } from 'path';
import { platform } from 'process';
import { promisify } from 'util';

import { isNull } from '@curong/types';

/**
 * 拼接适用于 `Windows` 的命令
 *
 * @param pathString 路径字符串
 * @returns 返回拼接好的命令字符串
 */
function getCommand(pathString: string): string {
    return `(New-Object -COM WScript.Shell).CreateShortcut('${pathString}').TargetPath;`;
}

/**
 * 解析 `lnk` 文件的原始地址
 *
 * @param pathString 路径字符串
 * @returns 返回解析好的原始地址字符串
 * @throws 如果解析文件失败，则会抛出异常
 * @note
 *  - 在调用 `readLnk()` 之前，请勿使用 `access()` 检查文件的可访问性。
 *   这样做会引入竞态条件，因为其他进程可能会在两次调用之间更改文件的状态。
 *   相反，用户代码应该直接 `read` 文件并处理文件不可访问时引发的错误。
 */
export default async function readLnk(pathString: string): Promise<string> {
    pathString = normalize(pathString);

    if (platform !== 'win32') {
        throw new TypeError('[readLnk] 无法解析不是 ".lnk" 后缀的文件', {
            cause: { pathString }
        });
    }

    const command = `powershell.exe -command ${getCommand(pathString)}`;
    const { stdout, stderr } = await promisify(exec)(command, {
        encoding: 'utf8'
    });

    if (!isNull(stderr)) {
        throw new Error('[readLnk] 解析 ".lnk" 文件时失败', {
            cause: { pathString, stderr, stdout }
        });
    }

    return stdout;
}

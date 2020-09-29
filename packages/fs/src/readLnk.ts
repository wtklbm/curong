import { exec } from 'child_process';
import { platform } from 'process';
import { promisify } from 'util';
import { normalize } from 'path';

import { isNull } from '@curong/types';
import { format } from '@curong/term';

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
 * @throws 如果解析失败，或者参数错误会抛出异常
 */
export default async function readLnk(pathString: string): Promise<string> {
    pathString = normalize(pathString);

    if (platform !== 'win32') {
        return format({
            name: 'readLnk',
            message: '无法解析不是 ".lnk" 后缀的文件',
            data: { pathString }
        });
    }

    const command = `powershell.exe -command ${getCommand(pathString)}`;
    const { stdout, stderr } = await promisify(exec)(command, {
        encoding: 'utf8'
    });

    if (!isNull(stderr)) {
        throw format({
            name: 'readLnk',
            message: '"lnk" 文件解析失败',
            data: { pathString, stderr }
        });
    }

    return stdout;
}

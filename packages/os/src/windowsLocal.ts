import { exec } from '@curong/process';

import { isWindows } from './platform';

/**
 * 获取 `Windows` 系统的区域语言设置
 *
 * @returns 如果找到了区域语言则返回语言代码，比如 `zh-CN`，否则返回 `null`
 */
export default async function windowsLocal(): Promise<string | null> {
    if (!isWindows) {
        return null;
    }

    const command = 'powershell.exe Get-UICulture';
    const { stdout } = await exec(command, { encoding: 'utf8' });

    return (stdout as string).split('\n')[3].split(/ +/)[1];
}

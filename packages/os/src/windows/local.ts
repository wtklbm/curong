import { exec } from '@curong/process';

import { isWindows } from '../platform';

/**
 * 获取 `Windows` 系统的区域语言设置
 *
 * @returns 如果找到了区域语言则返回语言代码，比如 `zh-CN`，否则返回 `null`
 * @example
 *
 * ```typescript
 * const local = await windowsLocal();
 * console.log(local); // "zh-CN"
 * ```
 */
export default async function windowsLocal(): Promise<string | null> {
    if (!isWindows) {
        return null;
    }

    const { stdout } = await exec(
        'powershell.exe -Command "[System.Globalization.CultureInfo]::CurrentCulture.Name"',
        {
            encoding: 'utf8',
            env: process.env
        }
    );

    return stdout as string;
}

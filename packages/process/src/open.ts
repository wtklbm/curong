import { release } from 'os';

import spawn from './spawn';
import type { OpenOptions } from './types';

/**
 * 使用用户操作系统定义的默认应用程序打开文件
 *
 * @param args 再执行命令的时候所传递的选项
 * @param opts 执行 `spawn` 时所传递的配置
 *
 *  - `command`: 自定义命令，默认情况下会根据操作系统自动选择
 *  - 其他选项请参考 {@link import('child_process').SpawnOptions}
 *
 * @returns 该方法内部调用了 `spawn` 来执行命令，所以会返回 `SpawnResult`
 * @example
 *
 * ```javascript
 * const ret = await open('http://baidu.com');
 *
 * console.log(ret);
 * ```
 */
export default async function open(args: string | string[], opts: OpenOptions = {}) {
    const options = { ...opts, shell: true } as OpenOptions;
    const _args = ([] as string[]).concat(args);

    let { platform } = process;

    // 如果是 WSL
    if (platform === 'linux' && release().toLowerCase().includes('microsoft')) {
        platform = 'win32';
    }

    let { command } = options;

    if (!command) {
        if (platform === 'win32') {
            options.shell = process.env.ComSpec;

            // 设置当前命令的标题为空，确保不会意外地将第一个参数解释为标题
            command = 'start ""';
        } else if (platform === 'darwin') {
            command = 'open';
        } else {
            command = 'xdg-open';
        }
    }

    return await spawn(command, _args, options);
}

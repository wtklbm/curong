import { spawn as _spawn, SpawnOptions, ChildProcess } from 'child_process';

import { isString } from '@curong/types';

import { SpawnResult } from './types/spawn';

/**
 * `Promise` 版本的 `spawn` 方法
 *
 * @param command 要执行的命令
 * @param args 执行命令时传递的参数列表
 * @param  options 配置对象，默认为 `{}`
 * @bug 目前还不支持在控制台输出颜色，也就是会产生颜色丢失的问题
 * @example
 *
 * ```javascript
 * const ret = await spawn('node', ['-v']);
 *
 * // {
 * //     pid: 3484,
 * //     output: [ /* ... *​/ ],
 * //     stdout: { /* ... *​/ },
 * //     stderr: { /* ... *​/ },
 * //     status: 0
 * // }
 * console.log(ret);
 * ```
 */
export default function spawn(
    command: string,
    args: string | string[],
    options: SpawnOptions = {}
): Promise<SpawnResult> {
    if (isString(args)) {
        args = args.split(/ +/g);
    }

    const child: ChildProcess = _spawn(command, args, options);
    const { stdout = Buffer.from([]), stderr = Buffer.from([]) } = child;

    if (stdout && child.stdout) {
        child.stdout.on('data', data => {
            console.log(data.toString());
        });
    }

    if (stderr && child.stderr) {
        child.stderr.on('data', data => {
            console.error(data.toString());
        });
    }

    const promise: Promise<SpawnResult> = new Promise((resolve, reject) => {
        child.on('error', error => {
            Object.assign(error, {
                pid: child.pid,
                output: [stdout, stderr],
                stdout,
                stderr,
                status: null
            });

            reject(error);
        });

        child.on('exit', code => {
            return resolve(
                Object.assign({} as SpawnResult, {
                    pid: child.pid,
                    output: [stdout, stderr],
                    stdout,
                    stderr,
                    status: code
                })
            );
        });
    });

    Object.defineProperty(promise, 'child', { value: child });

    return promise;
}

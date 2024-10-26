import {
    spawn as _spawn,
    ChildProcess,
    spawnSync,
    StdioOptions
} from 'child_process';

import { isArray, isTrue } from '@curong/types';

import type { SpawnOptions, SpawnResult } from './types';

// https://blogs.msdn.microsoft.com/twistylittlepassagesallalike/2011/04/23/everyone-quotes-command-line-arguments-the-wrong-way
const escapeCmd = (input: string, doubleEscape: boolean): string => {
    if (!input.length) {
        return '""';
    }

    let ret;

    if (!/[ \v\t\n"]/.test(input)) {
        ret = input;
    } else {
        ret = '"';

        for (let i = 0, j; i <= input.length; ++i) {
            j = 0;

            while (input[i] === '\\') {
                ++i;
                ++j;
            }

            if (i === input.length) {
                ret += '\\'.repeat(j * 2);
                break;
            }

            ret += '\\'.repeat(input[i] === '"' ? j * 2 + 1 : j) + input[i];
        }

        ret += '"';
    }

    /** 在 shell 元字符前加上 ^ 前缀 */
    const addPrefix = (ret: string, len: number) => {
        for (let i = 0; i < len; i++) {
            ret = ret.replace(/[ |!%^&()<>"]/g, '^$&');
        }

        return ret;
    };

    return doubleEscape ? addPrefix(ret, 2) : addPrefix(ret, 1);
};

const escapeSh = (input: string): string => {
    if (!input.length) {
        return `''`;
    }

    if (!/[\r\n\t '"`#$&~*;?|()<>\\]/.test(input)) {
        return input;
    }

    // 转义单引号，并用新的引号包裹起来
    const result = `'${input.replace(/'/g, `'\\''`)}'`
        // 如果输入字符串周围已经有单引号，则清除它们
        .replace(/^(?:'')+(?!$)/, '')
        .replace(/\\'''/g, `\\'`);

    return result;
};

const getStdio = (
    stdout: readonly Uint8Array[],
    stderr: readonly Uint8Array[],
    opts: SpawnOptions
) => {
    const { stdio, isToString = true } = opts;

    const isPipe = (fd: number, stdio: StdioOptions = 'pipe'): boolean => {
        if (stdio === 'pipe' || stdio === null) {
            return true;
        }

        if (isArray(stdio)) {
            return isPipe(fd, stdio[fd] as StdioOptions);
        }

        return false;
    };

    const buf = (std: readonly Uint8Array[], isToString: boolean) => {
        const r = Buffer.concat(std);
        return isToString ? r.toString().trim() : r;
    };

    return {
        stdout: isPipe(1, stdio) ? buf(stdout, isToString) : null,
        stderr: isPipe(2, stdio) ? buf(stderr, isToString) : null
    };
};

/**
 * `Promise` 版本的 `spawn` 方法
 *
 * @param cmd 要执行的命令
 * @param args 执行命令时传递的参数列表
 * @param  opts 配置对象，默认为 `{}`
 *
 *  - `isToString`: 是否要将结果转换为字符串，默认为 `true`
 *  - 其他选项请参考 {@link import('child_process').SpawnOptions}
 *
 * @example
 *
 * ```typescript
 * const ret = await spawn('node', ['-v']);
 *
 * // {
 * //     cmd: 'node',
 * //     args: ['-v'],
 * //     stdout: { ... },
 * //     stderr: { ... },
 * //     signal: null,
 * //     status: 0
 * // }
 * console.log(ret);
 *
 * // 当命令以非 `0` 状态码退出时，则表示该命令报错了，需用户自行处理
 * if (ret.status !== 0 || signal !== null) {
 *     console.log(ret);
 * }
 * ```
 *
 * @throws
 * - 如果在执行命令的过程中出现了异常，则会抛出异常
 * - 有时候命令执行完成之后的状态码不为 0，但这不是该方法所导致的错误，需用户自行处理
 */
export default function spawn(
    cmd: string,
    args: string[] = [],
    opts: SpawnOptions = {}
): SpawnResult {
    if (opts.shell) {
        let script = cmd;

        // @ts-ignore
        cmd = opts.shell;

        // 如果为 `true`，则使用操作系统自带的 `shell`
        if (isTrue(cmd)) {
            cmd = process.platform === 'win32' ? process.env.ComSpec! : 'sh';
        }

        opts = { ...opts, shell: false };
        const shellArgs: string[] = [];

        if (/(?:^|\\)cmd(?:\.exe)?$/i.test(cmd)) {
            let command = '';

            for (let i = 0, is = false; i < script.length; ++i) {
                const char = script.charAt(i);

                if (char === ' ' && !is) {
                    break;
                }

                command += char;

                if (/^['"]$/.test(char)) {
                    is = !is;
                }
            }

            let envPath: string = command;

            try {
                const { env } = opts;
                const { PATH, PATHEXT } = process.env;
                const r = spawnSync(
                    process.platform === 'win32' ? 'where' : 'which',
                    [command],
                    {
                        env: {
                            PATH: env?.PATH ?? PATH,
                            PATHEXT: env?.PATHEXT ?? PATHEXT
                        },
                        shell: true,
                        encoding: 'utf8'
                    }
                );

                if (r.status == 0) {
                    envPath = r.stdout.trim();
                }
            } catch {}

            const isDouble = /\.(cmd|bat)$/.test(envPath.toLowerCase());
            script += args.reduce(
                (m, v) => m + ' ' + escapeCmd(v, isDouble),
                ''
            );
            shellArgs.push('/d', '/s', '/c', script);
            opts.windowsVerbatimArguments = true;
        } else {
            script += args.reduce((m, v) => m + ' ' + escapeSh(v), '');
            shellArgs.push('-c', script);
        }

        args = shellArgs;
    }

    let handler: ChildProcess;

    const child = new Promise((res, rej) => {
        handler = _spawn(cmd, args, opts);

        const stdout: Buffer[] = [];
        const stderr: Buffer[] = [];
        const { stdout: so, stderr: se } = handler;
        const reject = (error: Error) =>
            rej({
                cmd,
                args,
                ...getStdio(stdout, stderr, opts),
                error
            });

        if (so) {
            so.on('data', data => stdout.push(data)).on('error', reject);
            so.on('error', error => reject(error));
        }

        if (se) {
            se.on('data', data => stderr.push(data)).on('error', reject);
            se.on('error', error => reject(error));
        }

        handler.on('close', (status, signal) => {
            const result = {
                cmd,
                args,
                status,
                signal,
                ...getStdio(stdout, stderr, opts)
            };

            // if (status || signal) {
            //     rej({ ...result, error: 'command failed' });
            // } else {
            res(result);
            // }
        });

        handler.on('error', reject);
    }) as SpawnResult;

    setTimeout(() => {
        child.stdin = handler!.stdin;
        child.process = handler!;
    });

    return child;
}

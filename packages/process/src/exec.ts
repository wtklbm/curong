import { promisify } from 'util';
import { exec as _exec, PromiseWithChild } from 'child_process';

import { isArray } from '@curong/types';

import { ExecOptions } from './types/exec';

/**
 * `Promise` 版本的 `exec` 方法
 *
 * @param command 要执行的命令
 * @param options 配置选项
 * @returns 返回输入与输出
 */
export default function exec(
    command: string | string[],
    options?: ExecOptions
): PromiseWithChild<{
    stdout: string | Buffer;
    stderr: string | Buffer;
}> {
    if (isArray(command)) {
        command = command.join(' ');
    }

    return promisify(_exec)(command, options!);
}

import { Writable } from 'stream';
import { ChildProcess, SpawnOptions as _SpawnOptions } from 'child_process';

export interface SpawnProcess {
    /** 当前所执行的命令 */
    cmd: string;

    /** 当前命令的所执行的参数 */
    args: string[];

    /** 执行命令后返回的状态码 */
    status: number | null;

    /** 信号量 */
    signal: string | null;

    /** 标准输出 */
    stdout: string | Buffer | null;

    /** 标准错误 */
    stderr: string | Buffer | null;
}

export type SpawnOptions = Partial<
    _SpawnOptions & {
        /** 是否要将结果转换为字符串，默认为 `true` */
        isToString: boolean;
    }
>;

export type SpawnResult = Promise<SpawnProcess> & {
    stdin: Writable | null;
    process: ChildProcess | null;
};

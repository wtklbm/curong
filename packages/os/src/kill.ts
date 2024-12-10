import {
    exec,
    spawn,
    type ChildProcessWithoutNullStreams
} from 'child_process';

import { isFunction, isUintSafe, isUndefined } from '@curong/types';

const { platform, kill: processKill } = process;

const killPid = (pid: number, signal?: string | number) => {
    try {
        processKill(+pid, signal);
    } catch (e: any) {
        if (e.code !== 'ESRCH') {
            throw e;
        }
    }
};

const killAll = (
    tree: Record<number, number[]>,
    signal?: string | number,
    callback?: (error?: any) => void
) => {
    const killed = new Set();

    try {
        Object.keys(tree).forEach(pid => {
            tree[+pid].forEach(p => {
                if (!killed.has(p)) {
                    killPid(p, signal);
                    killed.add(p);
                }
            });

            if (!killed.has(pid)) {
                killPid(+pid, signal);
                killed.add(pid);
            }
        });
    } catch (e) {
        if (callback) {
            return callback(e);
        }

        throw e;
    }

    if (callback) {
        return callback();
    }
};

const buildProcessTree = (
    parentPid: number,
    tree: Record<number, number[]>,
    pidsToProcess: Set<number>,
    spawnChildProcessesList: (pid: string) => ChildProcessWithoutNullStreams,
    cb: (error?: any) => void
) => {
    const ps = spawnChildProcessesList(`${parentPid}`);
    let allData: string;

    ps.stdout.on('data', data => {
        allData += data.toString('ascii');
    });

    ps.on('close', code => {
        pidsToProcess.delete(parentPid);

        if (code != 0) {
            if (pidsToProcess.size < 1) {
                cb();
            }

            return;
        }

        (allData.match(/\d+/g) ?? []).forEach(pid => {
            const p = +pid;
            tree[parentPid].push(p);
            tree[p] = [];
            pidsToProcess.add(p);
            buildProcessTree(
                p,
                tree,
                pidsToProcess,
                spawnChildProcessesList,
                cb
            );
        });
    });
};

/**
 * 终止进程树中的所有进程，包括根进程
 *
 * @param pid 进程 ID
 * @param signal 要发送的信号，可以是字符串或数字
 * @param callback 回调函数
 */
function kill(pid: number | string, signal?: string | number): void;
function kill(pid: number | string, callback?: (value: any) => void): void;
function kill(
    pid: number | string,
    signal: string | number | undefined,
    callback: (value: any) => void
): void;
function kill(
    pid: number | string,
    signal?: string | number | ((value: any) => void),
    callback?: (value: any) => void
): void {
    if (isFunction(signal) && isUndefined(callback)) {
        callback = signal;
        signal = undefined;
    }

    if (!isUintSafe((pid = +pid))) {
        const e = new Error(`[kill] pid 必须是一个数字: ${pid}`);

        if (callback) {
            return callback(e);
        }

        throw e;
    }

    const tree: Record<number, number[]> = {};
    const pidsToProcess: Set<number> = new Set();
    tree[pid] = [];
    pidsToProcess.add(pid);

    switch (platform) {
        case 'win32':
            exec(`taskkill /T /F /PID ${pid}`, callback);
            break;

        case 'darwin':
            buildProcessTree(
                pid,
                tree,
                pidsToProcess,
                pid => spawn('pgrep', ['-P', pid]),
                () => killAll(tree, signal as any, callback)
            );
            break;

        case 'linux':
            buildProcessTree(
                pid,
                tree,
                pidsToProcess,
                pid => {
                    return spawn('ps', [
                        '-o',
                        'pid',
                        '--no-headers',
                        '--ppid',
                        pid
                    ]);
                },
                () => killAll(tree, signal as any, callback)
            );
            break;

        default:
            throw new EvalError(`[kill] 暂不支持该 ${platform} 操作系统`, {
                cause: { platform }
            });
    }
}

/**
 * 终止进程树中的所有进程，包括根进程
 *
 * @param pid 进程 ID
 * @param signal 要发送的信号，可以是字符串或数字
 */
function asyncKill(pid: number | string, signal?: string | number) {
    return new Promise(resolve => kill(pid, signal, resolve));
}

export { kill, asyncKill };

import { exec } from '@curong/process';

import type { WindowsTaskListResult } from './types';

/**
 * 获取 `Windows` 平台上正在运行的映像进程列表
 *
 * @returns 返回正在运行的映像信息对象
 *
 * 每一项包含以下属性:
 *
 * - `imageName` 映像名称
 * - `pid` 进程 `ID`
 * - `memusage` 内存占用，单位(`KB`)
 * - `session` 会话
 *   - `name` 会话名称
 *   - `id` 会话编号
 *
 * @example
 *
 * ```typescript
 * const tasks = await windowsTaskList();
 * // [
 * //     {
 * //         imageName: 'System Idle Process',
 * //         pid: '0',
 * //         memusage: '8',
 * //         session: { name: 'Services', id: '0' }
 * //     },
 * //
 * //     // ...
 * // ]
 * console.log(tasks);
 * ```
 */
export default async function windowsTaskList(): Promise<WindowsTaskListResult> {
    const { stdout } = await exec('tasklist /NH');
    const taskSplit = stdout.toString().trim().split('\n');

    return taskSplit.map((task: string) => {
        const splitChunk = task.trim().split(/\s{2,}/);
        const [imageName, pidAndSession, sessionId, mem] = splitChunk;
        const [pid, sessionName] = pidAndSession.split(/ /);
        const memusage = mem.split(' ')[0].replace(/,/g, '');
        const session = { name: sessionName, id: sessionId };

        return { imageName, pid, memusage, session };
    });
}

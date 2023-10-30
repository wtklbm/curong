import windowsTaskList from './taskList';

import { WindowsTaskListResult } from './types/taskList';

/**
 * 查找正在运行的 `Windows` 系统平台上的映像进程
 *
 * @param imageName 映像名称(包含 `.exe` 后缀扩展名，比如 `cmd.exe`)
 * @returns 返回与映像名称相关的多个进程信息对象
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
 * ```javascript
 * const task = await findWindowsTask('node.exe');
 * // [
 * //     {
 * //         imageName: 'node.exe',
 * //         pid: '7444',
 * //         memusage: '28732',
 * //         session: { name: 'Console', id: '1' }
 * //     }
 * // ]
 * console.log(task);
 * ```
 */
export default async function findWindowsTask(
    imageName: string
): Promise<WindowsTaskListResult> {
    return (await windowsTaskList()).filter(v => v.imageName === imageName);
}

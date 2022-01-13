import { isWindows } from './platform';

/**
 * 获取执行的命令名称(名字 + 后缀)，进行命令的跨平台兼容处理
 *
 * 在 `Windows` 平台上后缀是 `.cmd`，其他平台无后缀
 *
 * @param command 要执行的命令的名字
 * @returns 返回命令的可执行字符串
 * @example
 *
 * ```javascript
 * const cmd = appendCmd('npm');
 * console.log(cmd); // "npm.cmd"
 * ```
 */
export default function appendCmd(command: string) {
    return isWindows ? `${command}.cmd` : command;
}

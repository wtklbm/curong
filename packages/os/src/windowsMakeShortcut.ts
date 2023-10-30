import { basename, join } from 'path';
import { existsSync, lstatSync } from 'fs';
import { spawn } from '@curong/process';

import { isWindows } from './platform';
import { ShortcutOptions } from './types';

const buildArgs = (pathString: string, options?: ShortcutOptions): string[] => {
    const rawName = basename(pathString).replace(/(.*)\..*$/, '$1');
    const newOptions: Required<ShortcutOptions> = Object.assign(
        {
            args: '',
            cwd: '',
            hotkey: '',
            dirPath: '',
            force: false,
            name: rawName,
            windowMode: 4,
            description: '',
            icon: pathString
        },
        options
    );

    const { dirPath, force } = newOptions;

    if (!force && !existsSync(pathString)) {
        throw new Error(
            `[buildArgs]: 快捷方式的源 "${pathString}" 不是有效的路径`
        );
    }

    if (
        dirPath &&
        !force &&
        (!existsSync(dirPath) || !lstatSync(dirPath).isDirectory())
    ) {
        throw new Error(`[buildArgs]: "${dirPath}" 不是有效的存放链接的有效目录`);
    }

    const scriptPath = join(__dirname, '../scripts/shortcut.vbs');
    const { name, args, description, cwd, icon, windowMode, hotkey } =
        newOptions;

    return [
        scriptPath,
        pathString,
        dirPath,
        name,
        args,
        description,
        cwd,
        icon,
        windowMode.toString(),
        hotkey
    ];
};

/**
 * 创建 Windows 系统的快捷方式文件 (.link)
 *
 * @param pathString 快捷方式要指向的路径
 * @param options 选项
 *
 *  - `force`: 即使找不到原始文件，也要创建快捷方式
 *  - `name`: 快捷方式的名称
 *  - `description`: 快捷方式的描述
 *  - `dirPath`: 快捷方式存放的文件夹路径
 *  - `icon`: 快捷方式的图标路径
 *  - `args`: 快捷方式的参数
 *  - `cwd`: 快捷方式的工作目录
 *  - `hotkey`: 快捷方式的快捷键
 *  - `windowMode`: 快捷方式的窗口模式
 *
 * @throws
 *  - 如果当前不是 Windows 系统，则会抛出异常
 *  - 如果在创建快捷方式的过程中出现报错，会直接打印在终端中
 */
export default async function windowsMakeShortcut(
    pathString: string,
    options?: ShortcutOptions
) {
    if (!isWindows) {
        return new Error(
            '[windowsMakeShortcut]: 当前不是 Windows 系统，无法执行操作'
        );
    }

    await spawn('wscript', buildArgs(pathString, options), {
        stdio: ['ignore', 'ignore', 'inherit']
    });
}

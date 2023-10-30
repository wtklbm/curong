/** 快捷方式 (.link) 的选项 */
export type ShortcutOptions = Partial<{
    /** 即使找不到原始文件，也要创建快捷方式 */
    force: boolean;

    /** 快捷方式的名称 */
    name: string;

    /** 快捷方式的描述 */
    description: string;

    /** 快捷方式存放的文件夹路径 */
    dirPath: string;

    /** 快捷方式的图标路径 */
    icon: string;

    /** 快捷方式的参数 */
    args: string;

    /** 快捷方式的工作目录 */
    cwd: string;

    /** 快捷方式的快捷键 */
    hotkey: string;

    /** 快捷方式的窗口模式 */
    windowMode: number;
}>;

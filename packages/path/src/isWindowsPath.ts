import windowsPathSource from './windowsPathSource';

/**
 * 是否为合法的 `Windows` 路径地址
 *
 * @param path 要验证的路径
 * @param extend 是否是扩展的路径
 *
 * - 扩展的路径具有 `32767 - 12` 的路径长度。默认为 `false`
 * - 普通的路径长度为 `260 - 12` 个
 *
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 *
 * ```javascript
 * const ret = isWindowsPath('C:\\Program Files\\Common Files\\system');
 * console.log(ret); // true
 * ```
 *
 * # 路径解析规则
 *
 * - 格式：可选的长路径前缀(4)，驱动器号(1)，冒号(2)，反斜杠(1)，由反斜杠分隔的名称组件(255), 终止的空字符(1)
 * - 最大总路径长度为 `32767` 个字符
 * - 不能包含保留字 `[<>:"/\\|?*]|CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9]`
 * - 可能驱动器号前缀 `\\?\`
 * - 文件名或目录名不要以空格或句号结尾
 * - 最大单个文件名为最大路径长度减 `12`
 */
export default function isWindowsPath(path: string, extend: boolean = false) {
    const reg = new RegExp(`^${windowsPathSource}$`);
    const size = extend ? 32_767 : 260;
    const dirNoReg = /^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])$/;
    const dirSearchReg = /[<>:"/\\|?*]/g;

    if (!reg.test(path) || path.length > size) {
        return false;
    }

    if (path.startsWith('\\\\?\\')) {
        path = path.slice(4);
    }

    if (path.endsWith('\\')) {
        path = path.slice(0, -1);
    }

    const dirs = path.split('\\');

    for (let i = 1, len = dirs.length; i < len; i++) {
        const dir = dirs[i];

        if (
            dir === '.' ||
            !dir ||
            dir.length > size - 12 ||
            dirNoReg.test(dir) ||
            dirSearchReg.test(dir) ||
            (dir !== '..' && dir.endsWith('.')) ||
            dir.endsWith(' ')
        ) {
            return false;
        }
    }

    return true;
}

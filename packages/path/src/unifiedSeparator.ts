import isWindowsExtendedLengthPath from './isWindowsExtendedLengthPath';

/**
 * 统一路径分隔符，将所有的分隔符转换为 `/`
 *
 * @param pathString 要处理的路径字符串
 * @returns 返回处理好的路径字符串
 * @note `Windows` API 中的文件 `I/O` 函数将 `/` 转换为 `\`，作为将名称转换为 NT 样式名称的一部分，但使用
 * [`\\?\`](https://learn.microsoft.com/en-us/windows/win32/fileio/maximum-file-path-limitation)
 * 前缀时除外
 * @example
 *
 * ```typescript
 * console.log(unifiedSeparator('C:\\Video\\js.mp4')); // C:/Video/js.mp4
 * console.log(unifiedSeparator('/Video/js.mp4')); // /Video/js.mp4
 * ```
 */
export default function unifiedSeparator(pathString: string): string {
    return isWindowsExtendedLengthPath(pathString)
        ? pathString
        : pathString.replace(/\\/g, '/');
}

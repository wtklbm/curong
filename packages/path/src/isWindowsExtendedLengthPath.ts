import isWindowsPath from './isWindowsPath';

/**
 * 是不是一个 `Windows` 的扩展长度路径
 *
 * @param pathString 要处理的路径字符串
 * @returns 是则返回 `true`，否则返回 `false`
 */
export default function isWindowsExtendedLengthPath(
    pathString: string
): boolean {
    return isWindowsPath(pathString) && pathString.startsWith('\\\\?\\');
}

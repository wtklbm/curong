/**
 * 统一路径分隔符，将所有的分隔符转换为 `/`
 *
 * @param pathString 要处理的路径字符串
 * @returns 返回处理好的路径字符串
 * @example
 *
 * ```javascript
 * console.log(unifiedSeparator('C:\\Video\\js.mp4')); // C:/Video/js.mp4
 * console.log(unifiedSeparator('/Video/js.mp4')); // /Video/js.mp4
 * ```
 */
export default function unifiedSeparator(pathString: string): string {
    return pathString.replace(/\\/g, '/');
}

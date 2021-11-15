/**
 * 验证 `Windows` 路径的正则字符串
 *
 * 如果需要验证是否为合法的 `Windows` 路径字符串，请使用 `isWindowsPath` 方法。
 *
 * ```javascript
 * const pathWin =
 '(((\\\\\\\\\\?\\\\)?[a-zA-Z]:\\\\?)|\\.{1,2})(\\\\((?![<>:"/\\\\|?*]|CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(.*[^.\\s])*)+)+';
 * // \\?(?!CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9]|\.| )([^<>:"/\\|?*]))
 *
 * const reg1 = /(((\\\\\?\\)?[a-zA-Z]:\\?)|\.{1,2})(\\((?![<>:"/\\|?*]|CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(.*[^.\s])*)+)+/;
 * ```
 * @link [docs.microsoft](https://docs.microsoft.com/zh-cn/windows/win32/fileio/naming-a-file?redirectedfrom=MSDN)
 */
const windowsPathSource =
    '(((\\\\\\\\\\?\\\\)?[a-zA-Z]:\\\\?)|\\.{1,2})(\\\\((?![<>:"/\\\\|?*]|CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(.*[^.\\s])*)+)+';

export default windowsPathSource;

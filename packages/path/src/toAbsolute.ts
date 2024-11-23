import { isAbsolute, join } from 'path';

import normalize from './normalize';

/**
 * 将路径转换为绝对路径
 *
 * @param path 要处理的路径字符串
 * @param cwd 要拼接的工作目录，默认为 `process.cwd()`
 * @returns 返回标准化的绝对路径
 * @example
 * ```typescript
 * console.log(toAbsolute('~/Desktop/project')); // C:\Users\wtklbm\Desktop\project
 * ```
 */
export default function toAbsolute(path: string, cwd?: string): string {
    return normalize(
        isAbsolute(path) || path.startsWith('~')
            ? path
            : join(cwd ?? process.cwd(), path)
    );
}

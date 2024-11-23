import { homedir } from 'os';
import { normalize as _normalize } from 'path';

const homeDirectory = homedir();

/**
 * 标准化字符串路径
 *
 * - 减少 '..' 和 '.' 部分
 * - 当发现多个斜杠时，它们将被替换为单个斜杠
 * - 当路径包含尾部斜杠时，它会被保留
 * - 在 Windows 上使用反斜杠
 * - 替换 `~` 为绝对路径
 *
 * @param pathString 要规范化的字符串路径
 * @returns 返回处理好的路径字符串
 * @throw 如果 pathString 不是有效的路径字符串，则会抛出异常
 */
export default function normalize(pathString: string): string {
    return _normalize(pathString.replace(/^~(?=$|\/|\\)/, homeDirectory));
}

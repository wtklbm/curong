import { access, type PathLike } from 'fs';

/**
 * 指定路径的文件是不是存在
 *
 * @param path 文件或目录的路径。如果提供 URL，则必须使用 `file:` 协议
 * @param mode 一个整数掩码位，表示要执行的可访问性检查。
 *  它的值应该是 `fs.constants.F_OK` 或者由 `fs.constants.R_OK`、`fs.constants.W_OK` 和 `fs.constants.X_OK` 中的任意一个按位或组成的掩码 (例如 `fs.constants.W_OK` | `fs.constants.R_OK`)。
 *  有关更多详细信息，请参见 `File access constants`。
 * @returns 是则返回 `true，否则为 `false`
 * @note
 *  通常，仅当文件不会直接使用时才检查文件的可访问性，例如当其可访问性是来自另一个进程的信号时。
 *
 *  在 `Windows` 上，目录上的访问控制策略 (`ACLs`) 可能会限制对文件或目录的访问。
 *  但是，`access()` 函数不会检查 `ACL`，因此即使 `ACL` 限制用户读取或写入路径，也可能会报告该路径是可访问的。
 *
 *  在调用 `fs.open()`、`fs.readFile()` 或 `fs.writeFile()` 之前，请勿使用 `access()` 检查文件的可访问性。
 *  这样做会引入竞态条件，因为其他进程可能会在两次调用之间更改文件的状态。
 *  相反，用户代码应该直接 `open`、`read`、`write` 文件并处理文件不可访问时引发的错误。
 */
export default function exists(
    path: PathLike,
    mode?: number
): Promise<boolean> {
    return new Promise(resolve => access(path, mode, err => resolve(!err)));
}

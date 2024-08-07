/**
 * 验证邮箱的正则字符串
 *
 * 如果需要判断是不是合法的邮箱字符串，请使用 `isEmail` 方法。
 *
 * 邮箱验证规则：
 * - 最大长度等于 `320`，格式为 `{64}@{255}`。
 * - 用户名的最大总长度为64个字符。
 * - 域中部分最多255个字符(`@` 后面的字符)。
 *
 * ```typescript
 * const reg = /^((\".+\")|([-+*={}`~%&|^!?#'$\w\/]{1,}\.)*[-+*={}`~%&|^!?#'$\w\/]{1,})@(\[[\d]{1,3}(\.[\d]{1,3}){3}\]|([0-9a-zA-Z][-\w]{0,63}\.)*[a-zA-Z][-\\w]{0,62}[a-zA-Z])$/
 * ```
 */
const email =
    '((".+")|([-+*={}`~%&|^!?#\'$\\w\\/]{1,}\\.)*[-+*={}`~%&|^!?#\'$\\w\\/]{1,})@(\\[[\\d]{1,3}(\\.[\\d]{1,3}){3}\\]|([0-9a-zA-Z][-\\w]{0,63}\\.)*[a-zA-Z][-\\w]{0,62}[a-zA-Z])';

export default email;

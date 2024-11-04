/**
 * 验证邮箱的正则字符串
 *
 * 如果需要判断是不是合法的邮箱字符串，请使用 `isEmail` 方法。
 * 需要注意的是，该正则字符串只能粗略的判断是不是邮箱地址，如果需要更加严格的判断，请使用其他库。
 *
 * 邮箱验证规则：
 *  - 最大长度等于 `320`，格式为 `{64}@{255}`。
 *  - 用户名的最大总长度为64个字符。
 *  - 域中部分最多255个字符(`@` 后面的字符)。
 *
 * @note 该正则字符串来自于: [email-validator](https://github.com/manishsaraan/email-validator/blob/master/index.js)
 * @see
 *  - https://en.wikipedia.org/wiki/Email_address
 *  - https://emailregex.com
 */
const email =
    '(?:[-!#$%&\'*+\\/0-9=?A-Z^_a-z`{|}~](\\.?[-!#$%&\'*+\\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\\.?[a-zA-Z0-9])*\\.[a-zA-Z](-?[a-zA-Z0-9])+)';

export default email;

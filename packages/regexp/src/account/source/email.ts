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
 * @see
 *  - https://en.wikipedia.org/wiki/Email_address
 *  - https://emailregex.com
 */
// https://github.com/OneUptime/oneuptime/blob/master/Common/Types/Email.ts
const email =
    '(?:(?:[a-zA-Z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\\[(?:(?:(?:2(?:5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(?:2(?:5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\]))';

// https://github.com/manishsaraan/email-validator/blob/master/index.js
// const email =
//     '(?:[-!#$%&\'*+\\/0-9=?A-Z^_a-z`{|}~](\\.?[-!#$%&\'*+\\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\\.?[a-zA-Z0-9])*\\.[a-zA-Z](-?[a-zA-Z0-9])+)';

export default email;

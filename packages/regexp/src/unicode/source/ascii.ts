/**
 * 验证 `ASCII` 的正则字符串
 *
 * 常见用法:
 *  - `/\p{ASCII}/u`: 匹配 `U+0000` 到 `U+007F` 的 ASCII 字符，包括 `\n`
 *  - `/\p{Non_ASCII_Unicode}/u`: 匹配非 ASCII 字符 `U+0080` 到 `U+10FFFF` 减去 `U+D800` 到 `U+DFFF`
 *
 * @note 该正则是自动生成的。原始代码: [`/\p{ASCII}/u`](https://mothereff.in/regexpu#input=/\p{ASCII}/u)
 */
const ascii = '[\u0000-\u007F]';

export default ascii;

/**
 * 验证片假名的正则字符串
 *
 * @see
 *  - [日文片假名](http://www.unicode.org/charts/PDF/U30A0.pdf)
 *  - [日文片假名拼音扩展](http://www.unicode.org/charts/PDF/U31F0.pdf)
 *
 * @example
 *
 * ```typescript
 *  // ES 2018
 *  const reg = /[\p{Katakana}]/u;
 * ```
 */
const katakana =
    '[\u30A0-\u30FF\u30FD-\u30FF\u31F0-\u31FF\u32D0-\u32FE\u3300-\u3357\uFF66-\uFF6F\uFF71-\uFF9D]';

export default katakana;

/**
 * 验证片假名的正则字符串
 *
 * @example
 *
 * ```javascript
 *  // ES 2018
 *  const reg = /[\p{Katakana}]/u;
 * ```
 */
const katakana =
    '[\u30A1-\u30FA\u30FD-\u30FF\u31F0-\u31FF\u32D0-\u32FE\u3300-\u3357\uFF66-\uFF6F\uFF71-\uFF9D]';

export default katakana;

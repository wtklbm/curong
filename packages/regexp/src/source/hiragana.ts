/**
 * 验证平假名的正则字符串
 *
 * @example
 *
 * ```javascript
 *  // ES 2018
 *  const reg = /[\p{Hiragana}]/u;
 * ```
 */
const hiragana = '[\u3041-\u3096\u309D-\u309F]';

export default hiragana;

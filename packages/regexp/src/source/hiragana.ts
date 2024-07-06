/**
 * 验证平假名的正则字符串
 *
 * @see http://www.unicode.org/charts/PDF/U3040.pdf
 * @example
 *
 * ```typescript
 *  // ES 2018
 *  const reg = /[\p{Hiragana}]/u;
 * ```
 */
const hiragana = '[\u3041-\u3096\u3099-\u309F]';

export default hiragana;

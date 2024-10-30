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
 *  const reg = /\p{Script_Extensions=Katakana}/u;
 * ```
 */
const katakana =
    '(?:[\u0305\u0323\u3001-\u3003\u3008-\u3011\u3013-\u301F\u3030-\u3035\u3037\u303C\u303D\u3099-\u309C\u30A0-\u30FF\u31F0-\u31FF\u32D0-\u32FE\u3300-\u3357\uFE45\uFE46\uFF61-\uFF9F]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00\uDD20-\uDD22\uDD55\uDD64-\uDD67])';

export default katakana;

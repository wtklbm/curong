/**
 * 验证韩文的正则字符串
 *
 * @see
 *  - http://memory.loc.gov/diglib/codetables/9.3.html
 *  - [韩文拼音](http://www.unicode.org/charts/PDF/UAC00.pdf)
 *  - [韩文字母](http://www.unicode.org/charts/PDF/U1100.pdf)
 *  - [韩文兼容字母](http://www.unicode.org/charts/PDF/U3130.pdf)
 *
 * @info 该正则使用 `xregexp` 自动生成
 *
 * ```javascript
 *  const XRegExp = require('xregexp');
 *  const reg = new XRegExp('\\p{Hangul}', 'u');
 *  console.log(reg);
 * ```
 *
 * @example ```` 验证韩文的正则
 *
 * ```javascript
 *  // ES 2018
 *  const reg = /[\p{Script_Extensions=Hangul}]/u;
 * ```
 */
const korean =
    '[\u1100-\u11FF\u302E\u302F\u3131-\u318E\u3200-\u321E\u3260-\u327E\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]';

export default korean;

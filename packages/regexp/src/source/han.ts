/**
 * 验证汉文的正则字符串(包含特殊字符)
 *
 * 该正则字符串匹配了除了汉字以外的其他一些字符，如果只需要验证汉字，请使用 `unifiedIdeograph`。
 *
 * @see
 *  - [CJK部首补充](http://www.unicode.org/charts/PDF/U2E80.pdf)
 *  - [CJK笔划](http://www.unicode.org/charts/PDF/U31C0.pdf)
 *  - [康熙部首](unicode.org/charts/PDF/U2F00.pdf)
 *  - [汉字结构描述字符](http://www.unicode.org/charts/PDF/U2FF0.pdf)
 *  - [注音符号](unicode.org/charts/PDF/U3100.pdf)
 *  - [注音符号（闽南语、客家语扩展）](http://www.unicode.org/charts/PDF/U31A0.pdf)
 *  - [CJK字母及月份](http://www.unicode.org/charts/PDF/U3200.pdf)
 *  - [CJK特殊符号（日期合并）](http://www.unicode.org/charts/PDF/U3300.pdf)
 *
 * @example
 *
 * ```javascript
 *  // ES 2018
 *  // `/\p{Ideographic}/u` 和 `/\p{Script=Han}/u` 匹配了除汉字外的其他一些字符
 *  const reg = /[\p{Han}]/u;
 * ```
 */
const han =
    '[\u2E80-\u2EFF\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DB5\u4E00-\u9FEF\uF900-\uFA6D\uFA70-\uFAD9\u3200-\u32FF\u3300-\u33FF]';

export default han;

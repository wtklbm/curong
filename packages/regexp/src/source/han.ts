/**
 * 验证汉文的正则字符串 (包含特殊字符)
 *
 * @note
 *  - 该正则是自动生成的。原始代码: [`/\p{Script_Extensions=Han}/u`](https://mothereff.in/regexpu#input=/\p{Script_Extensions=Han}/u)
 *  - 该正则字符串匹配了除了汉字以外的其他一些字符，如果只需要验证汉字，请使用 [`/\p{Unified_Ideograph}/u`](https://mothereff.in/regexpu#input=/\p{Unified_Ideograph}/u)
 * @see
 *  - [CJK部首补充](http://www.unicode.org/charts/PDF/U2E80.pdf)
 *  - [CJK笔划](http://www.unicode.org/charts/PDF/U31C0.pdf)
 *  - [康熙部首](unicode.org/charts/PDF/U2F00.pdf)
 *  - [汉字结构描述字符](http://www.unicode.org/charts/PDF/U2FF0.pdf)
 *  - [注音符号](unicode.org/charts/PDF/U3100.pdf)
 *  - [注音符号（闽南语、客家语扩展）](http://www.unicode.org/charts/PDF/U31A0.pdf)
 *  - [CJK字母及月份](http://www.unicode.org/charts/PDF/U3200.pdf)
 *  - [CJK特殊符号（日期合并）](http://www.unicode.org/charts/PDF/U3300.pdf)
 *  - [CJK统一表意文字](http://www.unicode.org/charts/PDF/U4E00.pdf)
 */
const han =
    '(?:[\xB7\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3001-\u3003\u3005-\u3011\u3013-\u301F\u3021-\u302D\u3030\u3037-\u303F\u30FB\u3190-\u319F\u31C0-\u31E5\u31EF\u3220-\u3247\u3280-\u32B0\u32C0-\u32CB\u32FF\u3358-\u3370\u337B-\u337F\u33E0-\u33FE\u3400-\u4DBF\u4E00-\u9FFF\uA700-\uA707\uF900-\uFA6D\uFA70-\uFAD9\uFE45\uFE46\uFF61-\uFF65]|\uD81B[\uDFE2\uDFE3\uDFF0\uDFF1]|\uD834[\uDF60-\uDF71]|\uD83C[\uDE50\uDE51]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])';

export default han;

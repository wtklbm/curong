/**
 * 验证中文汉字的正则字符串
 *
 * @note
 *  - 该正则是自动生成的。原始代码: [`/\p{Unified_Ideograph}/u`](https://mothereff.in/regexpu#input=/\p{Unified_Ideograph}/u)
 *  - 该正则只会匹配汉字，如果还需要多匹配一些字符，请使用 [`/\p{Script_Extensions=Han}/u`](https://mothereff.in/regexpu#input=/\p{Script_Extensions=Han}/u)
 * @see http://unicode.org/reports/tr44/#Unified_Ideograph
 */
const unifiedIdeograph =
    '(?:[\u3400-\u4DBF\u4E00-\u9FFF\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])';

export default unifiedIdeograph;

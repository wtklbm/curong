/**
 * 验证中文汉字的正则字符串
 *
 * @example ```` 生成验证汉字的正则表达式
 *
 * ```javascript
 *  const hanReg = new RegExp(`(?:${source.han})+`);
 * ```
 *
 * @info 该正则是自动生成的。原始代码：'\\p{Unified_Ideograph}'。
 *  该正则只会匹配汉字，如果还需要多匹配一些字符，请使用 `han`。
 *
 * @see http://unicode.org/reports/tr44/#Unified_Ideograph
 *
 * @example ```` 验证表达式
 *
 * ```javascript
 *  // ES 2018
 *  const reg = /\p{Unified_Ideograph}/u;
 * ```
 */
const unifiedIdeograph =
    '[\u3400-\u4DB5\u4E00-\u9FEF\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]';

export default unifiedIdeograph;

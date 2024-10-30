/**
 * 验证日文的正则字符串
 *
 * 相关内容:
 *
 * - `\u3000-\u303F` Punctuation 日式标点符号
 * - `\u3040-\u309F` Hiragana 平假名
 * - `\u30A0-\u30FF` Katakana 片假名
 * - `\uFF00-\uFF9F` Full-width Roman/Half-width Katakana 全角罗马字符和半角片假名
 * - `\u4E00-\u9FAF` CJK (Common & Uncommon) 中日韩统一表意文字 常见和罕见的汉字
 * - `\u3400-\u4DBF` CJK Ext. A (Rare) 中日韩统一表意文字扩展A 稀有汉字
 *
 * @warn 因为日文中包含汉字，所以在检测日文时需要排除仅仅是中文的可能性。避免检测错误。
 *
 * 参考：
 *
 * - 日文中包含片假名，中文中没有
 * - 同时捕获中文和日文，看日文正则和中文正则哪个捕获的内容最长
 *
 * @note 该正则使用 `xregexp` 自动生成
 *
 * ```typescript
 *   const XRegExp = require('xregexp);
 *   const reg = new XRegExp('[\\p{Han}\\p{Hiragana}\\p{Katakana}]');
 * ```
 *
 * @example ```` 验证日文的 `ES` 写法
 *
 * ```typescript
 *  // ES 2018
 *  const reg = /[\p{Script_Extensions=Han}\p{Script_Extensions=Hiragana}\p{Script_Extensions=Katakana}]/u;
 * ```
 */
const japanese =
    '(?:[\xB7\u0305\u0323\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3001-\u3003\u3005-\u3011\u3013-\u301F\u3021-\u302D\u3030-\u3035\u3037-\u303F\u3041-\u3096\u3099-\u30FF\u3190-\u319F\u31C0-\u31E5\u31EF-\u31FF\u3220-\u3247\u3280-\u32B0\u32C0-\u32CB\u32D0-\u3370\u337B-\u337F\u33E0-\u33FE\u3400-\u4DBF\u4E00-\u9FFF\uA700-\uA707\uF900-\uFA6D\uFA70-\uFAD9\uFE45\uFE46\uFF61-\uFF9F]|\uD81B[\uDFE2\uDFE3\uDFF0\uDFF1]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67]|\uD834[\uDF60-\uDF71]|\uD83C[\uDE00\uDE50\uDE51]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])';

export default japanese;

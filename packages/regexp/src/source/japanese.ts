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
 * ```javascript
 *   const XRegExp = require('xregexp);
 *   const reg = new XRegExp('[\\p{Han}\\p{Hiragana}\\p{Katakana}]');
 * ```
 *
 * @example ```` 验证日文的 `ES` 写法
 *
 * ```javascript
 *  // ES 2018
 *  const reg = /[\p{Script_Extensions=Han}\p{Script_Extensions=Hiragana}\p{Script_Extensions=Katakana}]/u;
 * ```
 */
const japanese =
    '[\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DB5\u4E00-\u9FEF\uF900-\uFA6D\uFA70-\uFAD9\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FD-\u30FF\u31F0-\u31FF\u32D0-\u32FE\u3300-\u3357\uFF66-\uFF6F\uFF71-\uFF9D]';

export default japanese;

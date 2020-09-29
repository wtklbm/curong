/**
 * 验证汉文的正则字符串(包含特殊字符)
 *
 * 该正则字符串匹配了除了汉字以外的其他一些字符，如果只需要验证汉字，请使用 `unifiedIdeograph`。
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
    '[\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DB5\u4E00-\u9FEF\uF900-\uFA6D\uFA70-\uFAD9]';

export default han;

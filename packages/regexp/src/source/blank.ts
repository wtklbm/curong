/**
 * 验证所有的空白字符的正则字符串，比如空格
 *
 * @note 该正则是自动生成的。原始代码: '\\p{Z}'。
 * @example ```` 验证表达式
 *
 * ```typescript
 *  // ES 2018
 *  const reg = /\p{Z}/u; // 等价于 `/\p{Separator}/u`
 * ```
 */
const blank = '[\u0020\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]';

export default blank;

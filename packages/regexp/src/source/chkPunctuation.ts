/**
 * 验证中日韩的标点符号的正则字符串
 *
 * @see
 *  - [CJK标点符号](http://www.unicode.org/charts/PDF/U3000.pdf)
 *  - [中文竖排标点](http://www.unicode.org/charts/PDF/UFE10.pdf)
 *  - [CJK兼容符号（竖排变体、下划线、顿号）](http://www.unicode.org/charts/PDF/UFE30.pdf)
 *
 * @note 该正则是自己写的，不是自动生成的。参考的原始代码部分：`\\p{InCJK_Symbols_and_Punctuation}`。
 */
const chkPunctuation =
    '[\u2000-\u206F\u2E00-\u2E7F\u3000-\u303F\uFF00-\uFFEF\uFE30-\uFE4F\uFE10-\uFE1F]';

export default chkPunctuation;

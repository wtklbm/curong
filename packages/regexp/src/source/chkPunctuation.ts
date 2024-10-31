/**
 * 验证中日韩的标点符号的正则字符串
 *
 * @see
 *  - [CJK标点符号](http://www.unicode.org/charts/PDF/U3000.pdf)
 *  - [中文竖排标点](http://www.unicode.org/charts/PDF/UFE10.pdf)
 *  - [CJK兼容符号（竖排变体、下划线、顿号）](http://www.unicode.org/charts/PDF/UFE30.pdf)
 *  - [一般标点](http://www.unicode.org/charts/PDF/U2000.pdf)
 *  - [半宽全宽形状](http://www.unicode.org/charts/PDF/UFF00.pdf)
 *
 * @note 该正则是自己写的，不是自动生成的。
 *  - 中文: `。？！，、；：‘’“”﹃﹄「」﹁﹂『』（）［］〔〕【】…⋯－—＿～·．﹏《》〈〉`
 *  - 韩文: `―〃×○ㅁ□`
 *  - `\u2000-\u206F`: General Punctuation
 *  - `\u2E00-\u2E7F`: Supplemental Punctuation
 *  - `\u3000-\u303F`: CJK Symbols and Punctuation，即 `\p{CJK_Symbols_and_Punctuation}`
 *  - `\uFE10-\uFE1F`: Vertical Forms
 *  - `\uFE30-\uFE4F`: CJK Compatibility Forms
 *  - `\uFF00-\uFFEF`: Halfwidth and Fullwidth Forms
 */
const chkPunctuation =
    '[\xB7\xD7\u2000-\u206F\u22EF\u25A1\u25CB\u2E00-\u2E7F\u3000-\u303F\u3141\uFE10-\uFE1F\uFE30-\uFE4F\uFF00-\uFFEF]';

export default chkPunctuation;

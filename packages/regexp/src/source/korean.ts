/**
 * 验证韩文的正则字符串
 *
 * @note 该正则是自动生成的。原始代码: [`/\p{Script_Extensions=Hangul}/u`](https://mothereff.in/regexpu#input=/\p{Script_Extensions=Hangul}/u)
 * @see
 *  - http://memory.loc.gov/diglib/codetables/9.3.html
 *  - [韩文拼音](http://www.unicode.org/charts/PDF/UAC00.pdf)
 *  - [韩文字母](http://www.unicode.org/charts/PDF/U1100.pdf)
 *  - [韩文兼容字母](http://www.unicode.org/charts/PDF/U3130.pdf)
 */
const korean =
    '[\u1100-\u11FF\u3001-\u3003\u3008-\u3011\u3013-\u301F\u302E-\u3030\u3037\u30FB\u3131-\u318E\u3200-\u321E\u3260-\u327E\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uFE45\uFE46\uFF61-\uFF65\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]';

export default korean;

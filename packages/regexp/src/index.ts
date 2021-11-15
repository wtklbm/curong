import execAll from './execAll';
import inChinese from './inChinese';
import inChkPunctuation from './inChkPunctuation';
import inJapanese from './inJapanese';
import isEmail from './isEmail';
import isIp from './isIp';
import isURI from './isURI';
import mapReplace from './mapReplace';
import matchNextIndex from './matchNextIndex';
import testEvery from './testEvery';
import testSome from './testSome';

import * as _source from './source';
export * from './types';

/**
 * 一组可以生成正则表达式的正则字符串
 *
 * 里面包含一些字符串，通过这些字符串，可以用来生成一个个正则表达式
 *
 * @link 参考链接:
 * - http://www.alanwood.net/unicode/index.html
 * - https://www.regular-expressions.info/unicode.html
 * - http://shouce.jb51.net/perl/PatternMatching.html
 * - https://www.cnblogs.com/gaara0305/p/10122776.html
 * - 处理中文的 `python` 库：https://zhon.readthedocs.io/en/latest/#
 * - https://unicode-table.com/
 *
 * ##### 如何兼容老版本的环境
 *
 * - `@babel/plugin-proposal-unicode-property-regex`
 * - `regexpu-core`
 *
 * ``` javascript
 *  // 获取支持中文的正则表达式
 *  const rewritePattern = require("regexpu-core");
 *  const _regexpu = rewritePattern('\\p{Unified_Ideograph}', 'u', {
 *      unicodePropertyEscape: true,
 *      useUnicodeFlag: false
 *  });
 *
 *  // 得到正则表达式
 *  const regexp = new RegExp(_regexpu, 'u');
 *  console.log(regexp);
 * ```
 */
const source = _source;

export {
    execAll,
    inChinese,
    inChkPunctuation,
    inJapanese,
    isEmail,
    isIp,
    isURI,
    source,
    mapReplace,
    matchNextIndex,
    testEvery,
    testSome
};

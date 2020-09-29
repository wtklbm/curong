import { isRegExp, isString, isArray } from '@curong/types';

/**
 * 使用一组正则来验证一个字符串是否符合预期
 *
 * @param regexps 要使用的正则
 * @param str 要验证的字符串
 * @return 只要有任何一个正则测试结果返回 `true`，则返回 `true`，否则返回 `false`
 *
 * - 如果 `regexps` 为空并且 `str` 不为空，则返回 `false`
 * - 如果 `regexps` 不为空并且 `str` 为空，则返回 `false`
 * - 如果 `regexps` 为空并且 `str` 为空，则报错
 */
export default function testSome(regexps: Array<RegExp>, str: string): boolean {
    if (!isString(str)) {
        throw new TypeError(`[testSome]: str不是一个字符串, "${str}"`);
    }

    if (!isArray(regexps)) {
        throw new TypeError(
            `[testSome]: regexps不是一个正则数组, "${regexps}"`
        );
    }

    if (str.length === 0 && regexps.length === 0) {
        throw new TypeError('[testSome]: str和regexps不能同时为空');
    }

    for (let i = 0, len = regexps.length; i < len; i++) {
        const reg = regexps[i];

        if (!isRegExp(reg)) {
            throw new TypeError(`[testSome]: reg不是一个正则, "${reg}"`);
        }

        if (reg.test(str)) {
            return true;
        }
    }

    return false;
}

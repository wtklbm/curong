/**
 * 使用一组正则来验证一个字符串是否符合预期
 *
 * @param regexps 要使用的正则
 * @param str 要验证的字符串
 * @return 只有所有的正则测试结果返回 `true`，则返回 `true`，否则返回 `false`
 *
 * - 如果 `regexps` 为空并且 `str` 不为空，则返回 `true`
 * - 如果 `regexps` 不为空并且 `str` 为空，则返回 `false`
 * - 如果 `regexps` 为空并且 `str` 为空，则报错
 *
 * @example
 *
 * ```javascript
 * const regexps = [/\d+/, /^[\w ]+$/];
 * const str = 'hello 123 world';
 * const ret = testEvery(regexps, str);
 *
 * console.log(ret); // true
 * ```
 */
export default function testEvery(
    regexps: Array<RegExp>,
    str: string
): boolean {
    if (str.length === 0 && regexps.length === 0) {
        throw new TypeError('[testEvery]: str和regexps不能同时为空');
    }

    for (let i = 0, len = regexps.length; i < len; i++) {
        if (!regexps[i].test(str)) {
            return false;
        }
    }

    return true;
}

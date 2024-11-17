import toRegExpSource from './toRegExpSource';

/**
 * 将一个字符串转换为一个正则表达式，用于在 `str.replace` 中使用
 *
 * @debug 如果出现问题，请验证该正则是否符合预期
 * @param str 要转换的一个字符串，不要为空字符串
 * @param flags 给字符串传递的 `flags`，默认为 `g`
 *
 * `flag` 包含下列值：
 * - `d`: [包含每个捕获组子字符串开始和结束的索引 (hasIndices)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/hasIndices)
 * - `g`: [全局 (global)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global)
 * - `i`: [忽略大小写 (ignoreCase)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/ignoreCase)
 * - `m`: [多行匹配 (multiline)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/multiline)
 * - `s`: [让 `.` 可以多行匹配 (dotAll)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/dotAll)，也可以看看 [proposal-regexp-dotall-flag](https://github.com/tc39/proposal-regexp-dotall-flag)
 * - `u`: [Unicode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicode)
 * - `v`: [带有集合符号 + 字符串属性的 (unicodeSets)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicodeSets)，也可以看看 [proposal-regexp-v-flag](https://github.com/tc39/proposal-regexp-v-flag)
 * - `y`: [粘性 (sticky)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky)
 *
 * @return 返回该字符串生成的正则表达式
 *
 * @throws
 *
 * - 如果 `flags` 不是预期的值，则会抛出异常
 *
 * @note
 * 默认情况下，字符串中包含正则使用的特殊字符，则替换不生效。
 * 此方法解决这个问题。
 *
 * @example
 *
 * ```typescript
 * const ret = toRegExp('\\d+', 'g');
 * console.log(ret); // /\\d\+/g
 * ```
 */
export default function toRegExp(
    str: string,
    flags: RegExp['flags'] = 'g'
): RegExp {
    if (!/^[dgimsuvy]{0,8}$/.test(flags)) {
        throw new TypeError(`[toRegExp]: flags不是预期的值, "${flags}"`);
    }

    return new RegExp(toRegExpSource(str), flags);
}

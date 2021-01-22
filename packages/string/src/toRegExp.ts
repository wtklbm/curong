import toRegExpSource from './toRegExpSource';

/**
 * 将一个字符串转换为一个正则表达式，用于在 `str.replace` 中使用
 *
 * @debug 如果出现问题，请验证该正则是否复合预期
 * @param str 要转换的一个字符串，不要为空字符串
 * @param flags 给字符串传递的 `flags`，默认为 `g`
 *
 * `flag` 包含下列值：
 * - `g` 全局
 * - `i` 大小写
 * - `m` 多行
 * - `u` Unicode
 * - `y` 粘性
 *
 * @return 返回该字符串生成的正则表达式
 *
 * @info
 * 默认情况下，字符串中包含正则使用的特殊字符，则替换不生效。
 * 此方法解决这个问题。
 */
export default function toRegExp(
    str: string,
    flags: RegExp['flags'] = 'g'
): RegExp {
    if (!/^[yumig]{0,5}$/.test(flags)) {
        throw new TypeError(`[toRegExp]: flags不是预期的值, "${flags}"`);
    }

    return new RegExp(toRegExpSource(str), flags);
}

import isStringFilled from '../../string/isStringFilled';

const modes = ['0o', '(?:0o)?', ''];

/**
 * 是不是一个八进制表示形式的数字字符串，例如 `0o12`
 *
 * @param value 要验证的值
 * @param mode 处理前缀的模式，默认为 `0`
 *  - 0: 显示 `0o` 前缀开头
 *  - 1: 可以显示也可以不显示 `0o` 前缀开头
 *  - 2: 不显示 `0o` 前缀开头
 * @returns 是则返回 `true`，否则为 `false`
 * @note
 *  - 转换为十六进制: `number.toString(8)`
 *  - 转换为数字: `parseInt(string, 8)`
 */
export default function isOctalString(
    value: unknown,
    mode: 0 | 1 | 2 = 0
): value is string {
    return (
        isStringFilled(value) &&
        new RegExp(`^${modes[mode]}[0-7]+$`).test(value)
    );
}

import isStringFilled from '../../string/isStringFilled';

const modes = ['0b', '(?:0b)?', ''];

/**
 * 是不是一个二进制表示形式的数字字符串，例如 `0b1010`
 *
 * @param value 要验证的值
 * @param mode 处理前缀的模式，默认为 `0`
 *  - 0: 显示 `0b` 前缀开头
 *  - 1: 可以显示也可以不显示 `0b` 前缀开头
 *  - 2: 不显示 `0b` 前缀开头
 * @returns 是则返回 `true`，否则为 `false`
 * @note
 *  - 转换为十六进制: `number.toString(2)`
 *  - 转换为数字: `parseInt(string, 2)`
 */
export default function isBinaryString(
    value: unknown,
    mode: 0 | 1 | 2 = 0
): value is string {
    return (
        isStringFilled(value) && new RegExp(`^${modes[mode]}[10]+$`).test(value)
    );
}

import isStringFilled from '../../string/isStringFilled';

import type { Hex } from './types';

const modes = ['0x', '(?:0x)?', ''];

/**
 * 是不是一个十六进制表示形式的数字字符串，例如 `0xA`
 *
 * @param value 要验证的值
 * @param mode 处理前缀的模式，默认为 `0`
 *  - 0: 显示 `0x` 前缀开头
 *  - 1: 可以显示也可以不显示 `0x` 前缀开头
 *  - 2: 不显示 `0x` 前缀开头
 * @returns 是则返回 `true`，否则为 `false`
 * @note
 *  - 转换为十六进制: `number.toString(16)`
 *  - 转换为数字: `parseInt(string, 16)`
 */
export default function isHexString(
    value: unknown,
    mode: 0 | 1 | 2 = 0
): value is Hex {
    return (
        isStringFilled(value) &&
        new RegExp(`^${modes[mode]}[0-9a-fA-F]+$`).test(value)
    );
}

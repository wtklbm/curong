import isStringFilled from '../../string/isStringFilled';

import type { Hex } from './types';

/**
 * 是不是一个十六进制表示形式的数字字符串，例如 `0xA`
 *
 * @param value 要验证的值
 * @param isStrict 是否以 `0x` 前缀开头，默认为 `true`
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isHexString(
    value: unknown,
    isStrict = true
): value is Hex {
    return (
        isStringFilled(value) &&
        new RegExp(`^${isStrict ? '0x' : ''}[0-9a-fA-F]+$`).test(value)
    );
}

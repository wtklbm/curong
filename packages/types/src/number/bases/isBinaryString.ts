import isStringFilled from '../../string/isStringFilled';

import type { Binary } from './types';

/**
 * 是不是一个二进制表示形式的数字字符串，例如 `0b1010`
 *
 * @param value 要验证的值
 * @param isStrict 是否以 `0x` 前缀开头，默认为 `true`
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isBinaryString(
    value: unknown,
    isStrict = true
): value is Binary {
    return (
        isStringFilled(value) &&
        new RegExp(`^${isStrict ? '0b' : ''}[10]+$`).test(value)
    );
}

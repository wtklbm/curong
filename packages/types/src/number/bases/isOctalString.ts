import isStringFilled from '../../string/isStringFilled';

import type { Octal } from './types';

/**
 * 是不是一个八进制表示形式的数字字符串，例如 `0o12`
 *
 * @param value 要验证的值
 * @param isStrict 是否以 `0x` 前缀开头，默认为 `true`
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isOctalString(
    value: unknown,
    isStrict = true
): value is Octal {
    return (
        isStringFilled(value) &&
        new RegExp(`^${isStrict ? '0o' : ''}[0-7]+$`).test(value)
    );
}

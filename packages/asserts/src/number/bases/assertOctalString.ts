import { isOctalString } from '@curong/types';

import typeGuard from '../../constants/typeGuard';

/**
 * 是不是一个八进制表示形式的数字字符串，例如 `0o12`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertOctalString(
    value: unknown,
    variableName: string
): asserts value is string {
    return typeGuard(value, variableName, isOctalString);
}
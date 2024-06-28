import { isURLString } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个可以转换为 `URL` 对象的的字符串
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertURLString(
    value: unknown,
    variableName: string
): asserts value is string {
    return typeGuard(value, variableName, isURLString);
}

import { typeofEqual } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 判断一个值的类型是否与指定的类型字符串相等
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @param typeString 要比较的类型字符串
 * @throws 如果不是则会抛出类型异常
 */
export default function assertTypeofEqual<T = unknown>(
    value: unknown,
    variableName: string,
    typeString: string
): asserts value is T {
    return typeGuard(
        { [variableName]: value },
        '一个值的类型不与指定的类型字符串相等',
        typeofEqual,
        typeString
    );
}

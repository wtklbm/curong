import { isFloat64 } from '@curong/types';

import typeGuard from '../../constants/typeGuard';

/**
 * 是不是一个双精度浮点数，取值在 `-1.7976931348623157e308 - 1.7976931348623157e308` 之间的浮点数
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertFloat64(
    value: unknown,
    variableName: string
): asserts value is number {
    return typeGuard(
        { [variableName]: value },
        '不是一个双精度浮点数，取值在 `-1.7976931348623157e308 - 1.7976931348623157e308` 之间的浮点数',
        isFloat64
    );
}

import { isBigIntObject } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个被包装后的 `BigInt` 对象，即 `Object()`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertBigIntObject(
    value: unknown,
    variableName: string
): asserts value is BigInt {
    return typeGuard(
        { [variableName]: value },
        '不是一个被包装后的 BigInt 对象，即 Object()',
        isBigIntObject
    );
}

import { isNumberObject } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个被包装后的数字对象，即 `new Number()` || `Object(0)`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @param isAllowNaN 当值为 `NaN` 时是否返回 `true`，默认为 `false`
 * @throws 如果不是则会抛出类型异常
 */
export default function assertNumberObject(
    value: unknown,
    variableName: string,
    isAllowNaN: boolean = false
): asserts value is Number {
    return typeGuard(
        { [variableName]: value },
        '不是一个被包装后的数字对象，即 new Number() || Object(0)',
        isNumberObject,
        isAllowNaN
    );
}

import { isSymbolObject } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个被包装后的 `Symbol` 对象，即 `Object(Symbol())`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertSymbolObject(
    value: unknown,
    variableName: string
): asserts value is Symbol {
    return typeGuard(value, variableName, isSymbolObject);
}

import { isDOMException } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个 `DOMException` 对象
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @param name 检查异常名称是否与指定的名称匹配
 * @throws 如果不是则会抛出类型异常
 */
export default function assertDOMException(
    value: unknown,
    variableName: string,
    name?: string
): asserts value is DOMException {
    return typeGuard(
        { [variableName]: value },
        '不是一个 DOMException 对象',
        isDOMException,
        name
    );
}

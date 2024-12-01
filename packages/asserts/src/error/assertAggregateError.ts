import { isAggregateError } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个 `AggregateError` 对象
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 * @note
 *
 * - `AggregateError` 对象代表了包装了多个错误对象的单个错误对象
 * - `AggregateError` 是 `Error` 的子类
 */
export default function assertAggregateError(
    value: unknown,
    variableName: string
): asserts value is TypeError {
    return typeGuard(
        { [variableName]: value },
        '不是一个 AggregateError 对象',
        isAggregateError
    );
}

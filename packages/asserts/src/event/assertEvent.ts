import { isEvent } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个 `Event` 事件
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertEvent(
    value: unknown,
    variableName: string
): asserts value is Event {
    return typeGuard(
        { [variableName]: value },
        '不是一个 Event 事件',
        isEvent
    );
}

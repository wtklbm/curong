import { isDateValid } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个有效的 `Date` 数字 (格林威治时间戳) 、字符串 (日期字符串)、数组 (包含年、月、日、时、分、秒、毫秒的数组)、对象 (`Date`)
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertDateValid<T = number | string | unknown[] | Date>(
    value: unknown,
    variableName: string
): asserts value is T {
    return typeGuard(
        { [variableName]: value },
        '不是一个有效的 Date 数字 (格林威治时间戳) 、字符串 (日期字符串)、数组 (包含年、月、日、时、分、秒、毫秒的数组)、对象 (Date)',
        isDateValid
    );
}

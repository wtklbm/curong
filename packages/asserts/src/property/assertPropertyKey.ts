import { isPropertyKey } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个可以作为属性的值
 *
 * 可以作为属性的值包括：字符串 (包括空字符串)、数字 (包含任意的正数和负数、`NaN`、`Infinity` 等) 和 `symbol`。
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertPropertyKey(
    value: unknown,
    variableName: string
): asserts value is PropertyKey {
    return typeGuard(
        { [variableName]: value },
        '不是一个可以作为属性的值',
        isPropertyKey
    );
}

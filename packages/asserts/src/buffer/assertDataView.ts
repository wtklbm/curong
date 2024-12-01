import { isDataView } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个 `DataView`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 * @note
 *
 * `DataView` 是一个可以从二进制 `ArrayBuffer` 对象中读写多种数值类型的底层接口，
 * 使用它时，不用考虑不同平台的字节序问题。它是一个二进制字节缓存区。
 */
export default function assertDataView(
    value: unknown,
    variableName: string
): asserts value is DataView {
    return typeGuard(
        { [variableName]: value },
        '不是一个 DataView',
        isDataView
    );
}

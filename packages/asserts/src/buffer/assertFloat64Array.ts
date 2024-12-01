import { isFloat64Array } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个 `Float64Array`，每一项占八个字节，值为 `-1.7976931348623157e308 - 1.7976931348623157e308`，并且 `5e-324` 是最小的正数
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 * @note
 *
 * - 使用 `IEEE 754` 浮点格式存储数字，`Float64Array` 将 `52` 位用于尾数，以及 `11` 位用于指数
 * - `JavaScript` 数字默认使用双精度浮点格式，这与 `Float64Array` 相同
 * - 在 `Javascript` 中能够表示的最大值是 `1.7976931348623157e308`，网络上通常称为 `1.8e308`
 */
export default function assertFloat64Array(
    value: unknown,
    variableName: string
): asserts value is Float64Array {
    return typeGuard(
        { [variableName]: value },
        '不是一个 `Float64Array`，每一项占八个字节，值为 `-1.7976931348623157e308 - 1.7976931348623157e308`，并且 `5e-324` 是最小的正数',
        isFloat64Array
    );
}

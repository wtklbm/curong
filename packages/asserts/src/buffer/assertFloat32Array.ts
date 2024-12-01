import { isFloat32Array } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个 `Float32Array`，每一项占四个字节，值为 `-3.4028234663852886e38 - 3.4028234663852886e38`，并且 `1.2e-38` 是最小的正数
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 * @note
 *
 * - 使用 `IEEE 754` 浮点格式存储数字，`Float32Array` 将 `23` 位用于尾数，以及 `8` 位用于指数
 * - 在 `Javascript` 中能够表示的最大值是 `3.4028234663852886e38`，网络上通常称为 `3.4e38`
 */
export default function assertFloat32Array(
    value: unknown,
    variableName: string
): asserts value is Float32Array {
    return typeGuard(
        { [variableName]: value },
        '不是一个 Float32Array，每一项占四个字节，值为 `-3.4028234663852886e38 - 3.4028234663852886e38`，并且 `1.2e-38` 是最小的正数',
        isFloat32Array
    );
}

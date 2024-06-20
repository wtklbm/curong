import { FLOAT32_MAX } from './constants';
import isFloat from './isFloat';

/**
 * 是不是一个单精度浮点数，取值在 `-3.4028234663852886e38 - 3.4028234663852886e38` 之间的浮点数
 *
 * - 使用 `IEEE 754` 浮点格式存储数字，`Float32` 将 `23` 位用于尾数，以及 `8` 位用于指数
 * - 当单精度的范围或精度不够时，可以选择双精度
 * - `3.4028234663852886e38` 是一个整数，所以调用该方法会返回 `false`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isFloat32(value: unknown): value is number {
    return isFloat(value) && Math.abs(value) <= FLOAT32_MAX;
}

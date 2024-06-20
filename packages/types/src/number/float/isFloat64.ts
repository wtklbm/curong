import { FLOAT64_MAX } from './constants';
import isFloat from './isFloat';

/**
 * 是不是一个双精度浮点数，取值在 `-1.7976931348623157e308 - 1.7976931348623157e308` 之间的浮点数
 *
 * - 使用 `IEEE 754` 浮点格式存储数字，`Float64` 将 `52` 位用于尾数，以及 `11` 位用于指数
 * - `JavaScript` 数字默认使用双精度浮点格式，这与 `Float64` 相同
 * - 在 `Javascript` 中能够表示的最大值是 `1.7976931348623157e308`，在网上通常简写为 `1.8e308`
 * - `1.7976931348623157e308` 是一个整数，所以调用该方法会返回 `false`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isFloat64(value: unknown): value is number {
    return isFloat(value) && Math.abs(value) <= FLOAT64_MAX;
}

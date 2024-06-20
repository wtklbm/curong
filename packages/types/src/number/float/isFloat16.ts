import { FLOAT16_MAX } from './constants';
import isFloat from './isFloat';

/**
 * 是不是一个半精度浮点数，取值在 `-65504 - 65504` 之间的浮点数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @note
 *
 * - 使用 `IEEE 754` 浮点格式存储数字，`Float16` 将 `10` 位用于尾数，以及 `5` 位用于指数
 * - 当半精度的范围或精度不够时，可以选择单精度
 */
export default function isFloat16(value: unknown): value is number {
    return isFloat(value) && Math.abs(value) <= FLOAT16_MAX;
}

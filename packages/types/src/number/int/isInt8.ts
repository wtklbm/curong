import { INT8_MAX, INT8_MIN } from './constants';
import isInt from './isInt';

/**
 * 是不是一个 `int8`，取值范围为 `-2^7 - 2^7-1` 的整数，即 `-128 - 127`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isInt8(value: unknown): value is number {
    return isInt(value) && value >= INT8_MIN && value <= INT8_MAX;
}

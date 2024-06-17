import { INT16_MAX, INT16_MIN } from './constants';
import isInt from './isInt';

/**
 * 是不是一个 `int16`，取值范围为 `-2^15 - 2^15-1` 的整数，即 `-32768 - 32767`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isInt16(value: unknown): value is number {
    return isInt(value) && value >= INT16_MIN && value <= INT16_MAX;
}

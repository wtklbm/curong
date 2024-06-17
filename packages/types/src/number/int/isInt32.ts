import { INT32_MAX, INT32_MIN } from './constants';
import isInt from './isInt';

/**
 * 是不是一个 `int32`，取值范围为 `-2^31 - 2^31-1` 的整数，即 `-2147483648 - 2147483647`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isInt32(value: unknown): value is number {
    return isInt(value) && value >= INT32_MIN && value <= INT32_MAX;
}

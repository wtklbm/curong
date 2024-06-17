import { UINT8_MAX } from './constants';
import isUint from './isUint';

/**
 * 是不是一个 `uint8`，取值范围为 `0 - 2^8-1` 的正整数，即 `0 - 255`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isUint8(value: unknown): value is number {
    return isUint(value) && value <= UINT8_MAX;
}

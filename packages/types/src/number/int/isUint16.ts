import { UINT16_MAX } from './constants';
import isUint from './isUint';

/**
 * 是不是一个 `uint16`，取值范围为 `0 - 2^16-1` 的正整数，即 `0 - 65535`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isUint16(value: unknown): value is number {
    return isUint(value) && value <= UINT16_MAX;
}

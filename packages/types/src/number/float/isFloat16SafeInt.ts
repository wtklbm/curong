import { isInt } from '../int';

import { FLOAT16_MAX_SAFE_INTEGER } from './constants';

/**
 * 是不是一个可以被半精度浮点数所能存储的整数，即 `2^11-1`，取值范围为 `-2047 - 2047`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isFloat16SafeInt(value: unknown): value is number {
    return isInt(value) && Math.abs(value) <= FLOAT16_MAX_SAFE_INTEGER;
}

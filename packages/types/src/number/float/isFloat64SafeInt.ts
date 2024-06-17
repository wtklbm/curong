import { isInt } from '../int';

import { FLOAT64_MAX_SAFE_INTEGER } from './constants';

/**
 * 是不是一个可以被双精度浮点数所能存储的整数，即 `2^53-1`，取值范围为 `-9007199254740991 - 9007199254740991`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isFloat64SafeInt(value: unknown): value is number {
    return isInt(value) && Math.abs(value) <= FLOAT64_MAX_SAFE_INTEGER;
}

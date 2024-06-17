import { isInt } from '../int';

import { FLOAT32_MAX_SAFE_INTEGER } from './constants';

/**
 * 是不是一个可以被单精度浮点数所能存储的整数，即 `2^24-1`，取值范围为 `-16777215 - 16777215`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isFloat32SafeInt(value: unknown): value is number {
    return isInt(value) && Math.abs(value) <= FLOAT32_MAX_SAFE_INTEGER;
}

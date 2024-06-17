import { isArrayHave } from '..';

import isFalsy from './isFalsy';
import type { Falsy } from './types';

/**
 * 是不是一个长度大于 0 的数组，且每一项的值都是虚值 (强制转换为 `Boolean` 后为 `false` 的值)
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isFalsyArray(value: unknown): value is Falsy[] {
    return isArrayHave(value) && value.every(isFalsy);
}

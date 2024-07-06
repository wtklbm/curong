import { isIntSafe } from '@curong/types';

import randomSafe from './randomSafe';

/**
 * 生成一个从开始位置到结束位置的安全的随机整数
 *
 * @param min 开始时的数字(包含)。无论传递的值是否为整数，都会向上取整为整数
 * @param max 结束时的数字(包含)。无论传递的值是否为整数，都会向下取整为整数
 * @returns 返回生成的安全的随机数
 * @example
 *
 * ```javascript
 * const n = rangeSafe(1, 12);
 * console.log(n); // 5
 * ```
 */
export default function rangeSafe(min: number, max: number): number {
    if (!isIntSafe(min)) {
        throw new TypeError(`[range] min 必须是一个安全的整数: ${min}`);
    }

    if (!isIntSafe(max)) {
        throw new TypeError(`[range] max 必须是一个安全的整数: ${max}`);
    }

    return Math.floor(randomSafe() * (max - min + 1)) + min;
}

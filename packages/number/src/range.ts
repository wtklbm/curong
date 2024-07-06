import { isIntSafe } from '@curong/types';

import random from './random';

/**
 * 生成一个从开始位置到结束位置的不安全的随机整数
 *
 * @param min 开始时的数字(包含)。无论传递的值是否为整数，都会向上取整为整数
 * @param max 结束时的数字(包含)。无论传递的值是否为整数，都会向下取整为整数
 * @returns 返回生成的不安全的随机数
 * @example
 *
 * ```typescript
 * const n = range(1, 12);
 * console.log(n); // 3
 * ```
 */
export default function range(min: number, max: number): number {
    if (!isIntSafe(min)) {
        throw new TypeError(`[range] min 必须是一个安全的整数: ${min}`);
    }

    if (!isIntSafe(max)) {
        throw new TypeError(`[range] max 必须是一个安全的整数: ${max}`);
    }

    return Math.floor(random() * (max - min + 1)) + min;
}

import { isIntSafe } from '@curong/types';

import randomSafe from './randomSafe';

/**
 * 生成一个从开始位置到结束位置的安全的随机整数
 *
 * @param start 开始时的数字(包含)。无论传递的值是否为整数，都会向上取整为整数
 * @param end 结束时的数字(包含)。无论传递的值是否为整数，都会向下取整为整数
 * @returns 返回生成的安全的随机数
 * @example
 *
 * ```typescript
 * const n = rangeSafe(1, 12);
 * console.log(n); // 5
 * ```
 */
export default function rangeSafe(start: number, end: number): number {
    if (!isIntSafe(start)) {
        throw new TypeError(`[range] start 必须是一个安全的整数: ${start}`);
    }

    if (!isIntSafe(end)) {
        throw new TypeError(`[range] end 必须是一个安全的整数: ${end}`);
    }

    return Math.floor(randomSafe() * (end - start + 1)) + start;
}

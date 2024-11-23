import { isIntSafe } from '@curong/types';

import random from './random';

/**
 * 生成一个从开始位置到结束位置的不安全的随机整数
 *
 * @param start 开始时的数字(包含)。无论传递的值是否为整数，都会向上取整为整数
 * @param end 结束时的数字(包含)。无论传递的值是否为整数，都会向下取整为整数
 * @returns 返回生成的不安全的随机数
 * @throws 如果 `start` 或 `end` 不是一个安全的整数，则会抛出类型异常
 * @example
 *
 * ```typescript
 * const n = range(1, 12);
 * console.log(n); // 3
 * ```
 */
export default function range(start: number, end: number): number {
    if (!isIntSafe(start) || !isIntSafe(end)) {
        throw new TypeError('[range] start 或 end 必须是一个安全的整数', {
            cause: { start, end }
        });
    }

    return Math.floor(random() * (end - start + 1)) + start;
}

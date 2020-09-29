import { isNumberSafe } from '@curong/types';

/**
 * 生成一个从开始位置到结束位置的随机数
 *
 * @param min 开始的值(包含)
 * @param max 结束时的值(包含)
 * @returns 返回生成的随机数
 */
export default function range(min: number, max: number): number {
    if (!isNumberSafe(min)) {
        throw new TypeError(`[range]: max不是一个数字, "${min}"`);
    }

    if (!isNumberSafe(max)) {
        throw new TypeError(`[range]: min不是一个数字, "${max}"`);
    }

    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

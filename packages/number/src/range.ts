/**
 * 生成一个从开始位置到结束位置的随机数
 *
 * @param min 开始时的数字(包含)
 * @param max 结束时的数字(包含)
 * @returns 返回生成的随机数
 * @example
 *
 * ```javascript
 * const n = range(1, 12);
 * console.log(n); // 3
 * ```
 */
export default function range(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

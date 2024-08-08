import { isInt } from './int';

/**
 * 是不是一个质数 (素数)
 *
 * @param 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 *
 * ```typescript
 * console.log(isPrimeNumber(2)); // true
 * console.log(isPrimeNumber(3)); // true
 * console.log(isPrimeNumber(4)); // false
 * console.log(isPrimeNumber(17)); // true
 * console.log(isPrimeNumber(18)); // false
 * ```
 * @note
 *
 * 质数 (Prime Number) 是指大于 1 的自然数，且只能被 1 和它本身整除的数。
 * 换句话说，质数没有其他的因数。
 *
 * - 大于 1: 质数必须是大于 1 的自然数，1 不是质数
 * - 唯一的因数: 质数只能被 1 和它本身整除，不能被其他任何自然数整除
 * - 偶质数: 2 是唯一的偶质数，其他的质数都是奇数
 * - 无穷多个: 质数的数量是无穷的，即使在很大的数字范围内，仍然可以找到质数
 *
 */
export default function isPrimeNumber(value: unknown): value is number {
    if (!isInt(value) || value <= 1) {
        return false;
    }

    if (value === 2) {
        return true;
    }

    for (let i = 2; i <= Math.sqrt(value); i++) {
        if (value % i === 0) {
            return false;
        }
    }

    return true;
}

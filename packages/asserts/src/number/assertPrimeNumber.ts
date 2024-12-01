import { isPrimeNumber } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个质数 (素数)
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 * @note
 *
 * 质数 (Prime Number) 是指大于 1 的自然数，且只能被 1 和它本身整除的数。
 * 换句话说，质数没有其他的因数。
 *
 * - 大于 1: 质数必须是大于 1 的自然数，1 不是质数
 * - 唯一的因数: 质数只能被 1 和它本身整除，不能被其他任何自然数整除
 * - 偶质数: 2 是唯一的偶质数，其他的质数都是奇数
 * - 无穷多个: 质数的数量是无穷的，即使在很大的数字范围内，仍然可以找到质数
 */
export default function assertPrimeNumber(
    value: unknown,
    variableName: string
): asserts value is number {
    return typeGuard(
        { [variableName]: value },
        '不是一个质数 (素数)',
        isPrimeNumber
    );
}

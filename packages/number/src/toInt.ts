import { isString, isZero } from '@curong/types';

/**
 * 将给定的值转换为整数
 *
 * @param value 要转换为整数的值，可以是一个数字或数字字符串
 * @returns 转换后的整数值
 * @throws
 *  - 如果 `value` 为空字符串，则会抛出类型异常
 *  - 如果 `value` 转换为数字后为 `NaN` 或正负 `Infinity`，则会抛出类型异常
 * @note 最简便的转换为整数的方法为 `value >> 0`
 * @example
 * ```typescript
 * console.log(toInt(4.7)); // 4
 * console.log(toInt('123.45')); // 123
 * ```
 */
export default function toInt(value: number | string): number {
    if (isString(value) && isZero(value.trim().length)) {
        throw new TypeError('[toInt] value 不能为空字符串', {
            cause: { value }
        });
    }

    const n = +value;

    if (!Number.isFinite(n)) {
        throw new TypeError(
            '[toInt] value 转换为数字后不能为 NaN 或正负 Infinity',
            {
                cause: { value }
            }
        );
    }

    return Math.floor(n);
}

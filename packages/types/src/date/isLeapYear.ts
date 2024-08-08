import { isUintSafeFilled } from '../number';

/**
 * 是不是一个闰年年份
 *
 * 闰年的定义如下：年份能被 4 整除且不能被 100 整除，或者年份能被 400 整除
 *
 * @param value 要验证的值，必须是一个大于 0 的无符号整数
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 *
 * ```typescript
 * console.log(isLeapYear(2020)); // true
 * console.log(isLeapYear(1900)); // false
 * console.log(isLeapYear(2000)); // true
 * console.log(isLeapYear(2021)); // false
 * ```
 */
export default function isLeapYear(value: unknown): value is number {
    return (
        isUintSafeFilled(value) &&
        ((value % 4 === 0 && value % 100 !== 0) || value % 400 === 0)
    );
}

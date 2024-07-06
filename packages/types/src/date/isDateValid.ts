import isUndefined from '../nullable/isUndefined';

/**
 * 是不是一个有效的 `Date` 数字 (格林威治时间戳) 、字符串 (日期字符串)、数组 (包含年、月、日、时、分、秒、毫秒的数组)、对象 (`Date`)
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 *
 * ```typescript
 * isDateValid(1617235200000); // true
 * isDateValid([0])); // true (Sat Jan 01 2000 00:00:00 GMT+0800)
 * isDateValid(new Date(1617235200000)); // true
 * isDateValid('01 Jan 1970 00:00:00 GMT'); // true
 * ```
 */
export default function isDateValid<T = number | string | unknown[] | Date>(
    value: unknown
): value is T {
    return !isUndefined(value) && !isNaN(new Date(value as any).valueOf());
}

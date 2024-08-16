/**
 * 将数字转换为字符串
 *
 * 该函数处理以下几种特殊情况：
 * - 将 `0` 转换为 `'0'`，将 `-0` 转换为 `'-0'`
 * - 将负无穷大 (`Number.NEGATIVE_INFINITY`) 转换为 `'-Infinity'`
 * - 将正无穷大 (`Number.POSITIVE_INFINITY`) 转换为 `'Infinity'`
 * - 将 `NaN` 转换为 `'NaN'`
 * - 其他数字直接转换为字符串
 *
 * @param value 要转换的数字
 * @returns 返回对应的字符串表示
 * @example
 *
 * ```typescript
 * console.log(stringify(0)); // '0'
 * console.log(stringify(-0)); // '-0'
 * console.log(stringify(Number.NEGATIVE_INFINITY)); // '-Infinity'
 * console.log(stringify(Number.POSITIVE_INFINITY)); // 'Infinity'
 * console.log(stringify(NaN)); // 'NaN'
 * console.log(stringify(42)); // '42'
 * ```
 */
export default function stringify(value: number): string {
    switch (value) {
        case 0:
            return Object.is(value, -0) ? '-0' : '0';

        case Number.POSITIVE_INFINITY:
            return 'Infinity';

        case Number.NEGATIVE_INFINITY:
            return '-Infinity';

        default:
            return value === value ? String(value) : 'NaN';
    }
}

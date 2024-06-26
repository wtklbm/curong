import type { Falsy } from './types';

/**
 * 是不是一个虚值 (强制转换为 `Boolean` 后为 `false` 的值)
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @note
 *
 * 在判断语句时，值都会被强制类型转换为布尔值，例如条件语句和循环语句。
 * 在 `JavaScript` 中只有 `8` 个 `falsy` 值。
 *
 *  - `false`     假
 *  - `0`         数值 `0`
 *  - `-0`        数值负 `0`
 *  - `0n`        数值 `0n`
 *  - `""`        空字符串 (字符串的长度为零)
 *  - `null`      缺少值
 *  - `undefined` 未定义
 *  - `NaN`       非数值
 */
export default function isFalsy(value: unknown): value is Falsy {
    return !value;
}

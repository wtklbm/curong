import { isTruthy, type Truthy } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个真值 (强制转换为 `Boolean` 后为 `true` 的值)
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 * @note
 *
 * 在判断语句时，值都会被强制类型转换为布尔值，例如条件语句和循环语句。
 * 在 `JavaScript` 中只有 `8` 个 `falsy` 值，对他们取反，就是 `truthy` 值。
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
export default function assertTruthy<T>(
    value: T,
    variableName: string
): asserts value is Truthy<T> {
    return typeGuard(
        { [variableName]: value },
        '不是一个真值 (强制转换为 Boolean 后为 true 的值)',
        isTruthy
    );
}

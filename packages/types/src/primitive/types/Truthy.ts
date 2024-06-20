import { Falsy } from './Falsy';

/**
 * 一个真值 (强制转换为 `Boolean` 后为 `true` 的值) 的类型
 *
 *  - `false`     假
 *  - `0`         数值 `0`
 *  - `-0`        数值负 `0`
 *  - `0n`        数值 `0n`
 *  - `""`        空字符串 (字符串的长度为零)
 *  - `null`      缺少值
 *  - `undefined` 未定义
 *  - `NaN`       非数值
 *
 * @note 通过 `Falsy` 来定义虚值
 */
export type Truthy<T> = Exclude<T, Falsy>;

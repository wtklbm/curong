/**
 * 一个虚值 (强制转换为 `Boolean` 后为 `true` 的值) 的类型
 *
 *  - `false`     `false` 关键字
 *  - `0`         数值 0
 *  - `-0`        数值负 0
 *  - `0n`        数值 0n
 *  - `""`        空字符串 (字符串的长度为零)
 *  - `null`      null - 缺少值
 *  - `undefined` undefined - 原始值
 *  - `NaN`       NaN - 非数值
 *
 * @note 通过 `Truthy` 来定义非虚值
 */
export type Falsy = false | 0 | -0 | 0n | '' | null | undefined | typeof NaN;

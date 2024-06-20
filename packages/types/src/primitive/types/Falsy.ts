/**
 * 一个虚值 (强制转换为 `Boolean` 后为 `false` 的值) 的类型
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
 * @note 通过 `Truthy` 来定义真值
 */
export type Falsy = false | 0 | -0 | 0n | '' | null | undefined | typeof NaN;

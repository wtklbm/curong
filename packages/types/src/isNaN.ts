/**
 * 一个数字是不是 `NaN`
 *
 * 该函数不同于全局的 `isNaN` 方法，它不存在类型隐式转换的行为。
 * 全局的 `isNaN` 方法可以判断任意的值，并存在类型隐式转换的行为，比如 `isNaN({})` 返回的值为 `true`。
 *
 * @param value 要验证的值
 * @returns 如果值是 `Number` 类型，并且值等于 `NaN` 则返回 `true`，否则为 `false`
 * @info `NaN` 是唯一一个与自身不相等的特殊值
 *
 * @polyfill
 * ``` javascript
 * Number.isNaN = Number.isNaN || function(value) {
 *   return typeof value === 'number' && value !== value;
 * }
 * ```
 */
export default function isNaN(value: any): value is number {
    return Number.isNaN(value);
}

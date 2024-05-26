import getTagEqual from './getTagEqual';

/** 验证是不是 `Window` 的默认函数 */
const defaultIsWindow = (value: unknown) => getTagEqual(value, 'Window');

/**
 * 是不是 `Window` 对象
 *
 * @param value 要验证的值
 * @param evaluator 一个自定义的评估函数
 *  默认情况下，该函数会通过 `Object.prototype.toString.call(value)` 来判断类型，
 *  有时候我们需要更加严谨的判断，那么就可以指定 `evaluator` 函数来自定义判断逻辑，
 *  如果指定了 `evaluator` 函数，则不会再进行 `Object.prototype.toString.call(value)` 判断。
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 *
 * ```javascript
 * // 使用自定义判断逻辑
 * const evaluator = (value: unknown): value is Window =>
 *     value != null && value === (value as Window).window;
 * console.log(typeof window != 'undefined' && isWindow(window, evaluator)); // true
 * ```
 */
export default function isWindow(
    value: unknown,
    evaluator?: (value: unknown) => value is Window
): value is Window {
    return (evaluator ? evaluator : defaultIsWindow)(value);
}

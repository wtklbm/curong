import getTag from '../type/getTag';

/** 验证是不是 `Document` 的默认函数 */
const defaultIsDocument = (value: unknown) =>
    getTag(value).includes('Document');

/**
 * 是不是 `Document` 对象
 *
 * @param value 要验证的值
 * @param evaluator 一个自定义的评估函数
 *  默认情况下，该函数会通过 `Object.prototype.toString.call(value)` 来判断类型，
 *  浏览器的结果是 `HTMLDocument`，`jsdom` 是 `Document`。为了最大程度的做到兼容，
 *  默认情况下，该方法的返回结果中只要包含 `Document` 结果就为 `true`。
 *  有时候我们需要更加严谨的判断，那么就可以指定 `evaluator` 函数来自定义判断逻辑，
 *  如果指定了 `evaluator` 函数，则不会再进行 `Object.prototype.toString.call(value)` 判断。
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 *
 * ```typescript
 * // 使用自定义判断逻辑
 * const evaluator = (value: unknown): value is Document =>
 *     value != null &&
 *     (value as Document).nodeType === 9 &&
 *     (value as Document).DOCUMENT_NODE === 9;
 *
 * console.log(
 *     typeof window != 'undefined' && isDocument(window.document, evaluator)
 * ); // true
 * ```
 */
export default function isDocument(
    value: unknown,
    evaluator?: (value: unknown) => value is Document
): value is Document {
    return (evaluator ? evaluator : defaultIsDocument)(value);
}

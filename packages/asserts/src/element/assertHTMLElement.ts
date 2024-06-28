import { isHTMLElement } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个 `HTMLElement`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 * @note
 *
 * 每一个 `HTMLElement` 具有以下特征：
 *  - `nodeType` 等于 1
 *  - `nodeName` 是一个字符串
 *  - 包含 `attributes`、`innerHTML`、`nodeValue`、`ownerDocument`、`style` 等属性
 *  - 继承自`<value>.ownerDocument.defaultView.HTMLElement`
 */
export default function assertHTMLElement(
    value: unknown,
    variableName: string
): asserts value is HTMLElement {
    return typeGuard(value, variableName, isHTMLElement);
}

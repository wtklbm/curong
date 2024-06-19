/**
 * 是不是一个 `HTMLElement`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 *
 * 每一个 `HTMLElement` 具有以下特征：
 *  - `nodeType` 等于 1
 *  - `nodeName` 是一个字符串
 *  - 包含 `attributes`、`innerHTML`、`nodeValue`、`ownerDocument`、`style` 等属性
 *  - 继承自`<value>.ownerDocument.defaultView.HTMLElement`
 */
export default function isHTMLElement(value: unknown): value is HTMLElement {
    try {
        return (
            value instanceof
            ((value as HTMLElement).ownerDocument.defaultView ?? window)
                .HTMLElement
        );
    } catch {}

    return false;
}

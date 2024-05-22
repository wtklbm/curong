/**
 * 是不是 `Document` 对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isDocument(value: unknown): value is Document {
    return (
        value != null &&
        (value as Document).nodeType === 9 &&
        (value as Document).DOCUMENT_NODE === 9
    );
}

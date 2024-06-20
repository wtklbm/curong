import getTagEqual from '../type/getTagEqual';

/**
 * 是不是一个 `TextNode`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isTextNode(value: unknown): value is Text {
    return getTagEqual(value, 'Text');
}

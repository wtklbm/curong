import getTagEqual from '../type/getTagEqual';

/**
 * 是不是一个 `NodeList`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isNodeList(value: unknown): value is NodeList {
    return getTagEqual(value, 'NodeList');
}

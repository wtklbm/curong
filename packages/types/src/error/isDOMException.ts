import getTagEqual from '../type/getTagEqual';

/**
 * 是不是一个 `DOMException` 对象
 *
 * @param value 要验证的值
 * @param name 检查异常名称是否与指定的名称匹配
 * @returns 是则返回 `true`，否则为 `false`
 * @see [MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMException)
 */
export default function isDOMException(
    value: unknown,
    name?: string
): value is DOMException {
    return (
        getTagEqual(value, 'DOMException') &&
        (!name || (value as DOMException).name === name)
    );
}

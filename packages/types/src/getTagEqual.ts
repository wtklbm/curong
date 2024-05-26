import getTag from './getTag';

/**
 * 判断原型上的类型标记是否等于某个值
 *
 * @param value 要获取类型的数据
 * @param tag 要验证的类型标记
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function getTagEqual<T extends unknown>(
    value: unknown,
    tag: string
): value is T {
    return getTag(value) === tag;
}

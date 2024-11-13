import { isNullOrUndefined } from '../nullable';

/**
 * 确定一个值上是否具有指定名称的私有属性
 *
 * @param value 值
 * @param key 属性名称
 * @returns 如果存在私有属性，则返回 `true`，否则为 `false`
 */
export default function hasOwnProperty(
    value: unknown,
    key: PropertyKey
): boolean {
    return (
        !isNullOrUndefined(value) &&
        Object.prototype.hasOwnProperty.call(value, key)
    );
}

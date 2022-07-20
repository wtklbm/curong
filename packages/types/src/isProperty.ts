import isNullOrUndefined from './isNullOrUndefined';

/**
 * 确定一个值上是否具有指定名称的属性，该属性可以是私有属性，也可以是原型上的属性
 *
 * @param value 值
 * @param key 属性名称
 * @returns 如果属性存在，则返回 `true`，否则为 `false`
 */
export default function isProperty(value: unknown, key: PropertyKey): boolean {
    // NOTE `key in value` 等价于 `Reflect.has(value, key)`
    return !isNullOrUndefined(value) && key in (value as object);
}

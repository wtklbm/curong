import getTagEqual from '../type/getTagEqual';

/**
 * 是不是一个 `WeakRef`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @see [MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakRef)
 * @note
 *
 * `WeakRef` 对象允许你保留对另一个对象的弱引用，但不会阻止垃圾回收 (`GC`) 清理被弱引用的对象
 */
export default function isWeakRef<T extends object = object>(
    value: unknown
): value is WeakRef<T> {
    return getTagEqual(value, 'WeakRef');
}

import getTagEqual from '../type/getTagEqual';

/**
 * 是不是一个 `WeakMap`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @note
 *
 * # `WeakMap`
 *
 * `WeakMap` 对象是一组 `键值对` 的集合，其中的键是弱引用(在没有其他引用存在时垃圾回收能正确进行)的。
 * 其键必须是对象(`Object`)，而值可以是任意的。如果要往对象上添加数据，又不想干扰垃圾回收机制，
 * 就可以使用 `WeakMap`。`WeakMap` 的 `key` 是不可枚举的。
 *
 * # 弱引用
 *
 * `WeakMap` 使用的是弱引用，当 `WeakMap` 中引用的变量重新赋值时，`WeakMap` 中的引用就会被销毁。
 *
 * ```javascript
 * let o = { name: 'wtklbm' };
 * const map = new WeakMap([[o, o.name]]);
 *
 * // `o` 的引用已经改为了 `null`，同时，`{ name: 'wtklbm' }` 所占用的内存会被销毁。
 * o = null;
 * ```
 */
export default function isWeakMap<K extends object, V = unknown>(
    value: unknown
): value is WeakMap<K, V> {
    return getTagEqual(value, 'WeakMap');
}

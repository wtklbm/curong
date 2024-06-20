import getTagEqual from '../type/getTagEqual';

/**
 * 是不是一个 `WeakSet`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @note
 *
 * `WeakSet` 对象是一些只保存对象值的集合，集合中对象的引用为弱引用(在没有其他引用存在时垃圾回收能正确进行)，并且其中的每个对象值都只能出现一次。
 * 如果传入一个可迭代对象作为参数, 则该对象的所有迭代值都会被自动添加进生成的 `WeakSet` 对象中。其中 `null` 被认为是 `undefined`。
 * `WeakSet` 是不可枚举的。
 * 递归调用自身的函数需要一种通过跟踪哪些对象已被处理，来应对循环数据结构的方法。为此，`WeakSet` 非常适合处理这种情况。
 */
export default function isWeakSet<T extends object>(
    value: unknown
): value is WeakSet<T> {
    return getTagEqual(value, 'WeakSet');
}

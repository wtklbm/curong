import getTag from './getTag';

/**
 * 是不是一个 `WeakMap`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @info `WeakMap` 对象是一组 `键值对` 的集合，其中的键是弱引用(在没有其他引用存在时垃圾回收能正确进行)的。其键必须是对象(`Object`)，而值可以是任意的。
 * 如果要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 `WeakMap`。
 * `WeakMap` 的 `key` 是不可枚举的。
 */
export default function isWeakMap(value: any): value is WeakMap<any, any> {
    return getTag(value) === 'WeakMap';
}

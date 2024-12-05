import type { SyncIterable } from '@curong/types';

/**
 * 将一个可迭代的值转换为数组
 *
 * `fromIterable` 函数将一个同步可迭代对象（`SyncIterable`）转换为一个标准数组。
 * 该函数适用于需要从同步可迭代对象中提取所有元素并存储为数组的场景。
 *
 * @param value 一个同步可迭代对象
 * @returns 返回一个数组
 * @example
 * ```typescript
 * // 使用 Set 作为同步可迭代对象
 * const set = new Set([1, 2, 3]);
 * const array1 = fromIterable(set);
 * console.log(array1);  // [1, 2, 3]
 *
 * // 使用字符串作为同步可迭代对象
 * const str = 'hello';
 * const array2 = fromIterable(str);
 * console.log(array2); // ['h', 'e', 'l', 'l', 'o']
 * ```
 * @note
 *  - 输入必须是同步可迭代对象，如 `Set`、`Map`、`Array`、字符串等
 *  - 函数使用 `Array.from` 方法将同步可迭代对象转换为数组
 *  - 函数不会修改原始的同步可迭代对象，而是返回一个新数组
 */
export default function fromIterable<T>(value: SyncIterable<T>): T[] {
    return Array.from(value);
}

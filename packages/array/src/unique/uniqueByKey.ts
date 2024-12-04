import { isFunction } from '@curong/types';

/**
 * 根据对象属性键或自定义键函数去除数组中的重复项
 *
 * @param array 待处理的数组
 * @param key 属性键 `K` 或自定义键函数 `(value: T) => any`
 *  - 如果传入属性键 `K`，函数会基于该属性值进行去重
 *  - 如果传入键函数 `(value: T) => any`，函数会基于键函数返回的值进行去重
 * @returns 返回去重后的新数组
 * @example
 * ```typescript
 * // 使用属性键去重
 * const users = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' },
 *   { id: 1, name: 'Alice' }
 * ];
 * const uniqueUsersById = uniqueByKey(users, 'id');
 * console.log(uniqueUsersById);
 * // [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
 *
 * // 使用键函数去重
 * const uniqueUsersByNameLength = uniqueByKey(users, user => user.name.length);
 * console.log(uniqueUsersByNameLength);
 * // [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
 *
 * // 复杂结构去重
 * const items = [
 *   { data: { id: 1 }, name: 'Item1' },
 *   { data: { id: 2 }, name: 'Item2' },
 *   { data: { id: 1 }, name: 'Item3' }
 * ];
 * const uniqueItemsByDataId = uniqueByKey(items, item => item.data.id);
 * console.log(uniqueItemsByDataId);
 * // [{ data: { id: 1 }, name: 'Item1' }, { data: { id: 2 }, name: 'Item2' }]
 * ```
 * @note
 *  - 使用 `Set` 存储唯一键值，时间复杂度为 `O(n)`
 *  - 原数组不会被修改，返回一个新的数组
 *  - 确保键函数或属性键能生成唯一标识符，否则可能导致不正确的去重
 */
export default function uniqueByKey<T, K extends keyof T>(
    array: T[],
    key: K | ((value: T) => any)
): T[] {
    const cache = new Set<T[K]>();
    const diff = isFunction(key)
        ? (value: T) => key(value)
        : (value: T, key: K) => value[key];

    return array.filter(item => {
        const v = diff(item, key as K) as T[K];

        if (cache.has(v)) {
            return false;
        }

        cache.add(v);

        return true;
    });
}

/**
 * 从数组中获取指定的值并映射成一个新的数组
 *
 * @param value 源数组
 * @param predicates 一个对象，`key` 是要返回的键名，`value` 是一个返回该键名值的函数
 * @returns 返回映射好的新数组。如果 `predicates` 的 `key` 的个数为 0，则会返回空数组
 * @example
 *
 * ```typescript
 * const array = [ { id: 0, name: 'a' }, { id: 1, name: 'b' } ];
 * const ret = mapPick(array, {
 *     id: v => v.id.toString().padStart(3, '0'),
 *     label: v => v.name
 * });
 * console.log(ret); // [ { id: '000', label: 'a' }, { id: '001', label: 'b' } ]
 * ```
 */
export default function mapPick<
    K extends PropertyKey,
    V,
    T extends Record<K, V>
>(
    value: readonly T[],
    predicates: Record<
        string,
        (value: T, key: string, index: number, array: readonly T[]) => any
    > = {}
) {
    const keys = Object.keys(predicates);

    if (!keys.length) {
        return [];
    }

    return value.reduce((memo, item, index) => {
        return memo.concat(
            keys.reduce((acc, key) => {
                acc[key] = predicates[key](item, key, index, value);
                return acc;
            }, {} as any)
        );
    }, []);
}

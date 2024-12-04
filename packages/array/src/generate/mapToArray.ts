/**
 * 生成一个指定长度的数组，并根据索引调用映射函数填充数组元素
 *
 * 该函数根据传入的 `length` 参数创建一个数组，并使用 `mapFn` 函数根据每个索引生成相应的元素。
 * 如果没有提供 `mapFn`，则默认返回索引值作为数组的元素。
 * 适用于需要根据索引动态生成数组的场景，支持默认行为和自定义映射逻辑。
 *
 * @param length 生成的数组的长度
 * @param mapFn 根据索引生成数组元素的映射函数，接受一个索引 `index` 并返回类型为 `T` 的值。默认为 `(index) => index`，即返回索引本身
 * @returns 返回生成的数组，包含根据索引生成的元素
 * @note 该方法相当于 `Array.from({ length: maxLen }, (index) => index)` 但速度更快
 * @example
 * ```typescript
 * const numbers = mapToArray(5, (index) => index * 2);
 * console.log(numbers); // [0, 2, 4, 6, 8]
 *
 * const strings = mapToArray(3, (index) => `Item ${index + 1}`);
 * console.log(strings); // ['Item 1', 'Item 2', 'Item 3']
 *
 * const defaultArray = mapToArray(4); // 使用默认映射函数
 * console.log(defaultArray); // [0, 1, 2, 3]
 *
 * const booleans = mapToArray(4, (index) => index % 2 === 0);
 * console.log(booleans); // [true, false, true, false]
 * ```
 */
export default function mapToArray<T>(
    length: number,
    mapFn: (index: number) => T = (index: number) => index as T
): T[] {
    const result: T[] = [];

    for (let i = 0; i < length; i++) {
        result.push(mapFn(i));
    }

    return result;
}

export type StringifyOptions<O = { key: string; value: any }> = {
    /**
     * 可以是一个转换结果的函数，也可以是一个字符串或数字数组
     *
     * - 如果传递的是包含字符串或数字的数组，则只有出现在数组中的键会出现在最终的结果中
     * - 如果传递的是一个转换结果的函数
     *  `replacer` 作为函数，它有两个参数，键 (key) 和值 (value)，它们都会被序列化。
     *  在开始时, `replacer` 函数会被传入一个空字符串作为 `key` 值，
     *  代表着要被 `stringify` 的这个对象。随后每个对象或数组上的属性会被依次传入。
     *  函数应当返回 `JSON` 字符串中的 `value`，如下所示：
     *
     *  - 如果返回一个 `Number`，转换成相应的字符串作为属性值被添加入 `JSON` 字符串。
     *  - 如果返回一个 `String`，该字符串作为属性值被添加入 `JSON` 字符串。
     *  - 如果返回一个 `Boolean`，"true" 或者 "false" 作为属性值被添加入 `JSON` 字符串。
     *  - 如果返回任何其他对象，该对象递归地序列化成 `JSON` 字符串，对每个属性调用 `replacer` 方法。
     *    除非该对象是一个函数，这种情况将不会被序列化成 `JSON` 字符串。
     *  - 如果返回 `undefined`，该属性值不会在 `JSON` 字符串中输出。
     *
     *  注意: 不能用 `replacer` 方法，从数组中移除值 (values)，
     *  如若返回 `undefined` 或者一个函数，将会被 `null` 取代
     */
    replacer?:
        | ((this: any, key: string, value: any) => any)
        | (number | string)[]
        | null;

    /**
     * 向返回值添加缩进、空格和换行符以使其更易于阅读
     *
     * 指定缩进用的空白字符串，用于美化输出；如果参数是个数字，
     * 它代表有多少的空格；上限为10。该值若小于1，则意味着没有空格。
     * 如果该参数为字符串，则该字符串将被作为空格，当字符串长度超过 10 个字母，取其前 10 个字母。
     * 如果该参数没有提供或者为 `null`，将没有空格。
     */
    space?: string | number;

    /**
     * 对象键的自定义比较函数
     *
     * @param a 前一个对象的 `key` 和 `value`
     * @param b 后一个对象的 `key` 和 `value`
     * @example
     *
     * ```typescript
     * // 比较两个字符串并根据当前区域设置 (locale) 返回它们的相对顺序
     * const obj = { c: 8, b: [{ z: 6, y: 5, x: 4 }, 7], a: 3 };
     * const ret = stringify(obj, {
     *     compare(a, b) {
     *         return a.key.localeCompare(b.key);
     *     }
     * });
     *
     * console.log(ret); // {"a":3,"b":[{"x":4,"y":5,"z":6},7],"c":8}
     * ```
     *
     * ```typescript
     * // 按相反的顺序对对象值进行排序
     * const obj = { c: 8, b: [{ z: 6, y: 5, x: 4 }, 7], a: 3 };
     * const ret = stringify(obj, {
     *     compare(a, b) {
     *         return a.value < b.value ? 1 : -1;
     *     }
     * });
     *
     * console.log(ret); // {"a":3,"b":[{"z":6,"y":5,"x":4},7],"c":8}
     * ```
     */
    compare?(a: O, b: O): number;

    /**
     * 是否将循环引用替换为 `[Circular *]` 的形式，默认为 `true`
     *
     * - 如果为 `true`，当检测到循环时，会将 `[Circular *]` 插入到节点中
     * - 如果为 `false`，则会抛出循环引用异常
     */
    cycles?: boolean;
};

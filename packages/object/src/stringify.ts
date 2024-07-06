import { format } from '@curong/term';

/**
 * 将 `JavaScript` 对象或值转换为 `JSON` 字符串
 *
 * @param value 要转换的 `JavaScript` 值，通常是对象或数组
 * @param replacer 一个转换结果的函数
 *
 * `replacer` 作为函数，它有两个参数，键 (key) 和值 (value)，它们都会被序列化。
 * 在开始时, `replacer` 函数会被传入一个空字符串作为 `key` 值，
 * 代表着要被 `stringify` 的这个对象。随后每个对象或数组上的属性会被依次传入。
 * 函数应当返回 `JSON` 字符串中的 `value`，如下所示：
 *
 *   - 如果返回一个 `Number`，转换成相应的字符串作为属性值被添加入 `JSON` 字符串。
 *   - 如果返回一个 `String`，该字符串作为属性值被添加入 `JSON` 字符串。
 *   - 如果返回一个 `Boolean`，"true" 或者 "false" 作为属性值被添加入 `JSON` 字符串。
 *   - 如果返回任何其他对象，该对象递归地序列化成 `JSON` 字符串，对每个属性调用 `replacer` 方法。
 *     除非该对象是一个函数，这种情况将不会被序列化成 `JSON` 字符串。
 *   - 如果返回 `undefined`，该属性值不会在 `JSON` 字符串中输出。
 *
 * 注意: 不能用 `replacer` 方法，从数组中移除值 (values)，
 * 如若返回 `undefined` 或者一个函数，将会被 `null` 取代。
 *
 * @param space 向返回值 `JSON` 文本添加缩进、空格和换行符以使其更易于阅读
 *
 * 指定缩进用的空白字符串，用于美化输出；如果参数是个数字，它代表有多少的空格；
 * 上限为10。该值若小于1，则意味着没有空格。如果该参数为字符串，
 * 则该字符串将被作为空格，当字符串长度超过 10 个字母，取其前 10 个字母。
 * 如果该参数没有提供或者为 `null`，将没有空格。
 *
 * @returns 返回一个 `JSON` 格式的字符串
 * @throw
 *
 * - 对包含循环引用的对象 (对象之间相互引用，形成无限循环) 执行此方法，会抛出异常
 * - 当尝试去转换 `BigInt` 类型的值会抛出异常
 *
 * @example
 *
 * ```typescript
 * const s = { value: '', number: 0, bool: false };
 * const ret = await stringify(s, (key, value) => {
 *     if (typeof value === 'string') {
 *         return undefined;
 *     }
 *     return value;
 * });
 * console.log(ret); // '{"number":0,"bool":false}'
 * ```
 *
 * ### 转换规则
 *
 * `JSON.stringify()`将值转换为相应的 `JSON` 格式。
 *
 *   - 要转换的值如果定义了 `toJSON()` 方法的话，该方法返回什么值，那么就将那个值序列化。
 *   - 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。
 *   - 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
 *   - `undefined`、任意的函数以及 `symbol` 值，在序列化过程中会被忽略
 *     (出现在非数组对象的属性值中时) 或者被转换成 `null` (出现在数组中时)。
 *     函数、`undefined` 在转换时，会返回 `undefined`，
 *     如 `JSON.stringify(function(){})` 或者 `JSON.stringify(undefined)`。
 *   - 所有以 `symbol` 为属性键的属性都会被完全忽略，即便 `replacer` 参数中强制指定包含了它们。
 *   - `Date` 日期调用了 `toJSON()` 将其转换为了 `string` 字符串，
 *     (同 `Date.toISOString()`) 因此会被当做字符串处理。
 *   - `NaN` 和 `Infinity` 格式的数值，以及 `null`，都会被当做 `null`。
 *   - 其他类型的对象，包括 `Map/Set/WeakMap/WeakSet`，仅会序列化可枚举的属性。
 */
export default function stringify(
    value: any,
    replacer?: (this: any, key: string, value: any) => any,
    space?: string | number
): Promise<string>;

/**
 * 将 `JavaScript` 对象或值转换为 `JSON` 字符串
 *
 * @param value 要转换的 `JavaScript` 值，通常是对象或数组
 * @param replacer 一个字符串和数字数组，用作选择将被字符串化的对象属性的批准列表
 * @param space 向返回值 `JSON` 文本添加缩进、空格和换行符以使其更易于阅读
 *
 * 指定缩进用的空白字符串，用于美化输出；如果参数是个数字，
 * 它代表有多少的空格；上限为10。该值若小于1，则意味着没有空格。
 * 如果该参数为字符串，则该字符串将被作为空格，当字符串长度超过 10 个字母，取其前 10 个字母。
 * 如果该参数没有提供或者为 `null`，将没有空格。
 *
 * @returns 返回一个 `JSON` 格式的字符串
 * @throw
 *
 * - 对包含循环引用的对象 (对象之间相互引用，形成无限循环) 执行此方法，会抛出异常
 * - 当尝试去转换 `BigInt` 类型的值会抛出异常
 *
 * @example
 *
 * ```typescript
 * const s = { value: '', number: 0, bool: false };
 * const ret = await stringify(s, ['value', 'bool']);
 * console.log(ret); // '{"value":"","bool":false}'
 * ```
 *
 * ### 转换规则
 *
 * `JSON.stringify()`将值转换为相应的 `JSON` 格式。
 *
 *   - 要转换的值如果定义了 `toJSON()` 方法的话，该方法返回什么值，那么就将那个值序列化。
 *   - 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。
 *   - 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
 *   - `undefined`、任意的函数以及 `symbol` 值，在序列化过程中会被忽略
 *     (出现在非数组对象的属性值中时) 或者被转换成 `null` (出现在数组中时)。
 *     函数、`undefined` 在转换时，会返回 `undefined`，
 *     如 `JSON.stringify(function(){})` 或者 `JSON.stringify(undefined)`。
 *   - 所有以 `symbol` 为属性键的属性都会被完全忽略，即便 `replacer` 参数中强制指定包含了它们。
 *   - `Date` 日期调用了 `toJSON()` 将其转换为了 `string` 字符串，
 *     (同 `Date.toISOString()`) 因此会被当做字符串处理。
 *   - `NaN` 和 `Infinity` 格式的数值，以及 `null`，都会被当做 `null`。
 *   - 其他类型的对象，包括 `Map/Set/WeakMap/WeakSet`，仅会序列化可枚举的属性。
 */
export default function stringify(
    value: any,
    replacer?: (number | string)[] | null,
    space?: string | number
): Promise<string>;

export default function stringify(
    value: any,
    replacer?: any,
    space?: string | number
): Promise<string> {
    return new Promise(resolve => {
        try {
            resolve(JSON.stringify(value, replacer, space));
        } catch (error) {
            throw format({
                name: 'stringify',
                message: '转换字符串失败',
                data: { value, error }
            });
        }
    });
}

import { format } from '@curong/term';
import {
    isArray,
    isFunction,
    isPlainObject,
    isTypeofObject
} from '@curong/types';

import type { StringifyOptions } from './types';

const safeStringifyReplacer = (
    object: any,
    compare: StringifyOptions['compare'],
    cycles: StringifyOptions['cycles'] = true
) => {
    const seen: WeakMap<object, string[]> = new WeakMap();

    const internal = (value: any, path: string[] = []) => {
        if (!isTypeofObject(value)) {
            return value;
        }

        const existingPath = seen.get(value);

        if (existingPath) {
            const path = existingPath.join('.');

            if (cycles) {
                return `[Circular *${path}]`;
            } else {
                throw new EvalError(`[stringify] 在 ${path} 出现了循环引用`);
            }
        }

        seen.set(value, path);

        const isA = isArray(value);
        let newValue: any = value;

        if (isA || isPlainObject(value)) {
            newValue = isA ? [] : {};

            let keys = Object.keys(value);

            if (isFunction(compare)) {
                keys = keys.sort((a, b) =>
                    compare(
                        { key: a, value: value[a] },
                        { key: b, value: value[b] }
                    )
                );
            }

            for (let i = 0, k, len = keys.length; i < len; i++) {
                k = keys[i];
                newValue[k] = internal(value[k], path.concat(k));
            }
        }

        seen.delete(value);

        return newValue;
    };

    return internal(object);
};

/**
 * 将 `JavaScript` 对象或值转换为 `JSON` 字符串
 *
 * @param value 要转换的 `JavaScript` 值，通常是对象或数组
 * @param options 配置选项
 *  - `replacer`: 可以是一个转换结果的函数，也可以是一个字符串或数字数组
 *  - `space`: 向返回值 `JSON` 文本添加缩进、空格和换行符以使其更易于阅读
 *  - `compare`: 对象键的自定义比较函数
 *  - `cycles`: 是否将循环引用替换为 `[Circular *]` 的形式，默认为 `true`
 * @returns 返回一个 `JSON` 格式的字符串
 * @throw 当尝试去转换不支持的类型 (例如 `BigInt`) 时，会抛出异常
 * @example
 *
 * ```typescript
 * const s = { value: '', number: 0, bool: false };
 * const ret = await stringify(s, {
 *     replacer(key, value) {
 *         if (typeof value === 'string') {
 *             return undefined;
 *         }
 *         return value;
 *     }
 * });
 * console.log(ret); // '{"number":0,"bool":false}'
 * ```
 *
 * ```typescript
 * const s = { value: '', number: 0, bool: false };
 * const ret = await stringify(s, { replacer: ['value', 'bool'] });
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
 *   - 其他类型的对象，包括 `Map/Set/WeakMap/WeakSet/WeakRef`，仅会序列化可枚举的属性。
 */
export default function stringify(
    value: any,
    options: StringifyOptions = {}
): Promise<string> {
    const { replacer, space, compare, cycles } = options;
    let handler: (k: string, v: any) => any;

    if (isFunction(replacer)) {
        handler = (k: string, v: any) => {
            return replacer(k, safeStringifyReplacer(v, compare, cycles));
        };
    } else if (isArray(replacer)) {
        const memo = new Set(replacer);
        handler = (k: string, v: any) => {
            // 第一次时，`key` 为空
            if (!k) {
                return v;
            }

            if (memo.has(k)) {
                return safeStringifyReplacer(v, compare, cycles);
            }
        };
    } else {
        handler = (k: string, v: any) =>
            safeStringifyReplacer(v, compare, cycles);
    }

    return new Promise(resolve => {
        try {
            resolve(JSON.stringify(value, handler, space));
        } catch (error) {
            throw format({
                name: 'stringify',
                message: '转换字符串失败',
                data: { value, error }
            });
        }
    });
}

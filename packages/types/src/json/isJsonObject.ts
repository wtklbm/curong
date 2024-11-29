import isArray from '../array/isArray';
import isBoolean from '../boolean/isBoolean';
import isNull from '../nullable/isNull';
import isFinite from '../number/isFinite';
import isNumber from '../number/isNumber';
import isPlainObject from '../object/isPlainObject';
import isString from '../string/isString';

import type { Json } from './types';

/**
 * 是不是一个符合 JSON 要求的有效的 JSON 对象
 *
 * 该函数用于检查一个值是否符合有效的 JSON 对象格式。
 * 该检查会递归地验证对象的键值对是否符合 JSON 格式的要求（例如：键必须是字符串，值可以是字符串、数字、布尔值、数组、对象等有效的 JSON 数据类型）。
 *
 * @param value 要检查的值
 * @returns 是返回 `true`，否则为 `false`
 * @example
 * ```typescript
 * console.log(isJsonObject(null)); // true
 * console.log(isJsonObject("hello")); // false
 * console.log(isJsonObject(42)); // true
 * console.log(isJsonObject([1, 2, 3])); // true
 * console.log(isJsonObject({ name: "Alice", age: 30 })); // true
 * console.log(isJsonObject({ key: undefined })); // false
 * ```
 * @note
 *  - 如果是 `NaN`、`Infinity` 或 `-Infinity`，经过 `JSON.stringify` 会被视为 `null`，因此被视为无效的 JSON
 *  - 对象中的 `Symbol()` 键名因为不可枚举，经过 `JSON.stringify` 后不会出现在字符串中，所以该函数也会返回 `true`
 *  - 函数会递归检查数组和对象的每个元素，确保每个键值对符合 JSON 格式的规则
 *  - 对象的键必须是字符串，值可以是有效的 JSON 数据类型（如：字符串、数字、布尔值、数组、对象等）
 */
export default function isJsonObject(value: unknown): value is Json {
    if (isNull(value) || isString(value) || isBoolean(value)) {
        return true;
    }

    // `NaN`、`Infinity`、`-Infinity` 经过 `JSON.stringify` 的结果为 `null`
    if (isNumber(value)) {
        return isFinite(value);
    }

    if (isArray(value)) {
        return value.every(isJsonObject);
    }

    if (isPlainObject(value)) {
        return Object.entries(value).every(
            ([k, v]) => isString(k) && isJsonObject(v)
        );
    }

    return false;
}

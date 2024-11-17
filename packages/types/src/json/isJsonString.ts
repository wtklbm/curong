import isStringFilled from '../string/isStringFilled';

/**
 * 是不是一个 JSON 字符串
 *
 * @param value 要验证的值
 * @param reviver 转换结果的函数。为对象的每个成员调用此函数。
 *   如果成员包含嵌套对象，则嵌套对象会先于父对象进行转换。
 * @returns 是则返回 `true`，否则为 `false`。空字符串为 `false`
 * @note
 *  - [JSON](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON) 可以用来序列化对象、数组、数字、字符串、布尔值和 `null`
 *  - 该方法使用 [`JSON.parse`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) 方法进行验证
 */
export default function isJsonString(
    value: unknown,
    reviver?: (key: string, value: any) => any
): value is string {
    if (!isStringFilled(value)) {
        return false;
    }

    try {
        JSON.parse(value, reviver);
        return true;
    } catch {
        return false;
    }
}

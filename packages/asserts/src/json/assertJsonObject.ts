import { isJsonObject, type Json } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个符合 JSON 要求的有效的 JSON 对象
 *
 * 该函数用于检查一个值是否符合有效的 JSON 对象格式。
 * 该检查会递归地验证对象的键值对是否符合 JSON 格式的要求（例如：键必须是字符串，值可以是字符串、数字、布尔值、数组、对象等有效的 JSON 数据类型）。
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertJsonObject(
    value: unknown,
    variableName: string
): asserts value is Json {
    return typeGuard(
        { [variableName]: value },
        '不是一个符合 JSON 要求的有效的 JSON 对象',
        isJsonObject
    );
}

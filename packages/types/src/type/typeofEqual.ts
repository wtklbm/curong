/**
 * typeof 的返回类型
 */
type TypeOfReturnType =
    | 'string'
    | 'number'
    | 'bigint'
    | 'boolean'
    | 'symbol'
    | 'undefined'
    | 'object'
    | 'function';

/**
 * 判断一个值的类型是否与指定的类型字符串相等
 *
 * @param value 要验证的值
 * @param typeString 要比较的类型字符串
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function typeofEqual(
    value: unknown,
    typeString: TypeOfReturnType
) {
    return typeof value === typeString;
}

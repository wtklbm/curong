import { isOwnProperty } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 确定一个值上是否具有指定名称的私有属性
 *
 * @param value 值
 * @param variableName 该值的变量名
 * @param key 属性名称
 * @throws 如果不存在私有属性，则会抛出类型异常
 */
export default function assertOwnProperty(
    value: unknown,
    variableName: string,
    key: PropertyKey
) {
    return typeGuard(value, variableName, isOwnProperty, key);
}

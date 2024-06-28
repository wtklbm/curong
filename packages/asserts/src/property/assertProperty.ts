import { isProperty } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 确定一个值上是否具有指定名称的属性，该属性可以是私有属性，也可以是原型上的属性
 *
 * @param value 值
 * @param variableName 该值的变量名
 * @param key 属性名称
 * @throws 如果不是则会抛出类型异常
 */
export default function assertProperty(
    value: unknown,
    variableName: string,
    key: PropertyKey
) {
    return typeGuard(value, variableName, isProperty, key);
}

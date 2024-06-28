import { isPropertyDescriptor } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个属性描述器
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @param allowExtraProperties 是否允许除 `configurable`、`enumerable`、`writable`、`get`、`set`、`value` 之外的其他属性，默认为 `true`
 * @throws 如果不是则会抛出类型异常
 */
export default function assertPropertyDescriptor(
    value: unknown,
    variableName: string,
    allowExtraProperties: boolean = true
): asserts value is PropertyDescriptor {
    return typeGuard(
        value,
        variableName,
        isPropertyDescriptor,
        allowExtraProperties
    );
}

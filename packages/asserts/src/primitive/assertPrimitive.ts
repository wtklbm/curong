import { isPrimitive, type Primitive } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个基本类型的值
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 * @note
 *
 * - `7` 种基本类型：`string`，`number`，`bigint`，`boolean`，`null`，`undefined`，`symbol`
 * - 所有基本类型的值都是不可改变的。基本类型直接代表了最底层的语言实现
 * - 除了 `null` 和 `undefined` 之外，所有基本类型都有其对应的包装对象，这个包裹对象的 `valueOf()` 方法返回基本类型值
 */
export default function assertPrimitive(
    value: unknown,
    variableName: string
): asserts value is Primitive {
    return typeGuard(value, variableName, isPrimitive);
}

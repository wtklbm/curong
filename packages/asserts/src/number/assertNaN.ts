import { isNaN } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个 `NaN`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @param isImplicit 是否进行隐式转换，默认为 `false`
 * @throws 如果不是则会抛出类型异常
 * @note
 *
 * - `NaN` 是 `Not a Number` 的缩写，他是一个特殊的 `number` 值
 * - `NaN` 的默认值等于 `Number.NaN`
 * - `NaN` 是唯一一个与自身不相等的特殊值，所以不能用 `==` 或 `===` 来进行判断，而应该使用 `isNaN` 方法
 * - `NaN` 和任何值相加都等于 `NaN`
 */
export default function assertNaN<T = number>(
    value: unknown,
    variableName: string,
    isImplicit: boolean = false
): asserts value is T {
    return typeGuard(
        { [variableName]: value },
        '不是一个 NaN',
        isNaN,
        isImplicit
    );
}

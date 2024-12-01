import { isFinite } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个不是 `Infinity`、`-Infinity` 或 `NaN` 的有限数
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @param isImplicit 是否进行隐式转换，默认为 `false`
 * @throws 如果不是则会抛出类型异常
 */
export default function assertFinite<T = number>(
    value: unknown,
    variableName: string,
    isImplicit: boolean = false
): asserts value is T {
    return typeGuard(
        { [variableName]: value },
        '不是一个不是 Infinity、-Infinity 或 NaN 的有限数',
        isFinite,
        isImplicit
    );
}

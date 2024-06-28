import { isWindow } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是 `Window` 对象
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @param evaluator 一个自定义的评估函数
 *  默认情况下，该函数会通过 `Object.prototype.toString.call(value)` 来判断类型，
 *  有时候我们需要更加严谨的判断，那么就可以指定 `evaluator` 函数来自定义判断逻辑，
 *  如果指定了 `evaluator` 函数，则不会再进行 `Object.prototype.toString.call(value)` 判断。
 * @throws 如果不是则会抛出类型异常
 */
export default function assertWindow(
    value: unknown,
    variableName: string,
    evaluator?: (value: unknown) => asserts value is Window
): asserts value is Window {
    return typeGuard(value, variableName, isWindow, evaluator);
}

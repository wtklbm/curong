import { functionToString, isNativeFunctionToString } from '../constants';
import type { Function } from '../types';

import isFunction from './isFunction';

/**
 * 是不是一个 `JavaScript` 内置函数
 *
 * 内置函数是 `JavaScript` 原生自带的函数。没有被任何人为的修改。
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isNativeFunction<
    R = unknown,
    A extends unknown[] = unknown[]
>(value: unknown): value is Function<R, A> {
    return (
        isFunction(value) &&
        // 确保该函数没有被人为修改
        isNativeFunctionToString &&
        // 结果只能是特定的字符串
        new RegExp(
            `^function ${(value as any).name}\\(\\) \\{ \\[native code\\] \\}$`
        ).test(functionToString.call(value))
    );
}

import { functionToString } from './constants';
import isFunction from './isFunction';
import type { Function } from './types';

/**
 * 是不是一个 `JavaScript` 内置函数
 *
 * 内置函数是 `JavaScript` 原生自带的函数。没有被任何认为的修改。
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
        functionToString.call(functionToString) ===
            'function toString() { [native code] }' &&
        // 结果只能是特定的字符串
        new RegExp(
            `^function ${value.name}\\(\\) \\{ \\[native code\\] \\}$`
        ).test(functionToString.call(value))
    );
}

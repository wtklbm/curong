import { functionToString } from './constants';
import isFunction from './isFunction';
import type { Class } from './types';

/**
 * 是不是一个类
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @note
 *
 * - 类不能直接执行，必须使用 `new` 关键字
 * - 类中无法访问 `caller`，`callee` 和 `arguments` 属性
 */
export default function isClass<T = unknown>(
    value: unknown
): value is Class<T> {
    return (
        isFunction(value) && functionToString.call(value).startsWith('class ')
    );
}

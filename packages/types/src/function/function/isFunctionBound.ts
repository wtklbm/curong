import hasOwnProperty from '../../property/hasOwnProperty';

import { functionToString } from '../constants';
import type { Function } from '../types';

import isFunction from './isFunction';

/**
 * 是不是一个经过 `.bind()` 所绑定过的函数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @note
 * - `.name` 的值的开头为 `bound `
 *   箭头函数没有自己的 `this`，但箭头函数调用 `bind` 方法时，也会在方法名之前增加 `bound` 前缀
 * - `.toString()` 的结果为 `'function () { [native code] }'`
 * - 没有 `prototype` 属性
 */
export default function isFunctionBound<
    R = unknown,
    A extends unknown[] = unknown[]
>(value: unknown): value is Function<R, A> {
    return (
        isFunction(value) &&
        value.name.startsWith('bound ') &&
        !hasOwnProperty(value, 'prototype') &&
        functionToString.call(value) === 'function () { [native code] }'
    );
}

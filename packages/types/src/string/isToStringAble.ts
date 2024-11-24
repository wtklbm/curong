import isFunction from '../function/function/isFunction';
import isNullOrUndefined from '../nullable/isNullOrUndefined';

import type { ToStringAble } from './types';

/**
 * 是不是一个拥有 `.toString` 方法的类型
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isToStringAble(value: unknown): value is ToStringAble {
    return !isNullOrUndefined(value) && isFunction(value!.toString);
}

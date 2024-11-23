import { isStringFilled } from '@curong/types';

import type { ObjectType } from '../types';

import fromCascadeKeys from './fromCascadeKeys';
import toCascadeKeys from './toCascadeKeys';

/**
 * 根据级联属性字符串获取源对象中的内容
 *
 * @param obj 源对象
 * @param cascadeKey 级联属性字符串
 * @param dependencies 级联属性字符串中所依赖的外部变量
 * @param isThrow 是否在访问属性失败时抛出异常，默认为 `true`
 * @returns 返回从源对象中依据级联属性字符串获取到的内容
 * @note 该方法使用了 `new Function`，如果用户禁用了 [eval](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval)，则导致代码异常
 * @throws
 *
 *  - 如果 `cascadeKey` 不是一个有效的级联属性字符串，则会抛出异常
 *  - 如果从源对象中访问属性失败了，则可能会抛出异常，需要用户自己捕获处理
 * @example
 *
 * ```typescript
 * const o = { key: [{ value: 'this is a test.' }] };
 * const ret = cascade(o, 'key[0].value');
 * console.log(ret); //'this is a test.'
 * ```
 */
export default function cascade<T = unknown>(
    obj: ObjectType,
    cascadeKey: string,
    dependencies?: ObjectType,
    isThrow: boolean = true
): T | undefined {
    if (!isStringFilled(cascadeKey)) {
        throw new TypeError(
            '[cascade] cascadeKey 不是一个有效的级联属性字符串',
            {
                cause: { obj, cascadeKey, dependencies, isThrow }
            }
        );
    }

    const keys = toCascadeKeys(cascadeKey, dependencies);
    const key = fromCascadeKeys(keys, { optional: true, startDot: true });
    const f = new Function('o', `return o${key};`);

    if (isThrow) {
        return f(obj);
    }

    try {
        return f(obj);
    } catch {}
}

import { format } from '@curong/term';
import { isStringHave } from '@curong/types';

import toCascadeKeys from './toCascadeKeys';
import fromCascadeKeys from './fromCascadeKeys';

import { ObjectType } from './types';

/**
 * 根据级联属性字符串获取源对象中的内容
 *
 * @param obj 源对象
 * @param cascadeKey 级联属性字符串
 * @param dependencies 级联属性字符串中所依赖的外部变量
 * @returns 返回从源对象中依据级联属性字符串获取到的内容
 * @throws
 *
 *  - 如果 `cascadeKey` 不是一个有效的级联属性字符串，则会抛出异常
 *  - 如果从源对象中访问属性失败了，则可能会抛出异常，需要用户自己捕获处理
 */
export default function cascade<T = any>(
    obj: ObjectType,
    cascadeKey: string,
    dependencies?: ObjectType
): T {
    if (!isStringHave(cascadeKey)) {
        throw format({
            name: 'cascade',
            message: 'cascadeKey不是一个有效的级联属性字符串',
            data: { cascadeKey }
        });
    }

    const keys = toCascadeKeys(cascadeKey, dependencies);
    const key = fromCascadeKeys(keys, { optional: true, startDot: true });
    const f = new Function('o', `return o${key};`);

    // NOTE: 这里并没有捕获异常，需用户手动捕获
    return f(obj);
}

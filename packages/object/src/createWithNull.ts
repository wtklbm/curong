import { isObject } from '@curong/types';

import type { ObjectType } from './types';

/**
 * 创建一个纯对象，该对象的原型是 `null`
 *
 * @param properties 包含一个或多个属性描述符的 JavaScript 对象
 * @returns 返回一个纯对象
 * @example
 *
 * ```javascript
 * const obj = createWithNull({
 *     a: {
 *         get() {
 *             return 1;
 *         }
 *     }
 * });
 *
 * console.log(obj.__proto__); // undefined
 * console.log(obj.a); // 1
 * ```
 */
export default function createWithNull(
    properties?: PropertyDescriptorMap & ThisType<any>
): ObjectType {
    if (isObject(properties)) {
        return Object.create(null, properties);
    }

    return Object.create(null);
}

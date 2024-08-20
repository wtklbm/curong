import { isArray, isPlainObject } from '@curong/types';

import type { SortOptions } from './types';

/**
 * 对象或数组的键进行排序
 *
 * @param value 要排序的对象或数组
 * @param options 排序选项
 *  - `deep`: 是否进行深度排序
 *  - `compare`: 自定义比较函数
 * @returns 返回排序后的对象或数组
 * @throws 如果输入的对象既不是普通对象也不是数组，则会抛出类型异常
 */
export default function sortKeys(
    value: Record<PropertyKey, any> | any[],
    options: SortOptions = {}
): Record<PropertyKey, any> | any[] {
    if (!isPlainObject(value) && !isArray(value)) {
        throw new TypeError(
            `[sortKeys] value 必须是一个数组或普通对象: ${value}`
        );
    }

    const { deep, compare } = options;
    const seenMap = new WeakMap();
    const processValue = (value: Record<PropertyKey, any> | any[]) => {
        if (isArray(value)) {
            return sortArray(value);
        }

        if (isPlainObject(value)) {
            return sort(value);
        }

        return value;
    };

    /**
     * 深度排序数组
     *
     * @param array 要排序的数组
     * @returns 返回排序后的数组
     */
    const sortArray = <T extends unknown[]>(array: T): T => {
        if (seenMap.has(array)) {
            return seenMap.get(array) as T;
        }

        const result = [] as unknown as T;
        seenMap.set(array, result);
        array.forEach((v: any) => result.push(processValue(v)));

        return result;
    };

    /**
     * 对对象的键进行排序
     *
     * @param object 要排序的对象
     * @returns 返回排序后的对象
     */
    const sort = (
        object: Record<PropertyKey, any> | any[]
    ): Record<PropertyKey, any> | any[] => {
        if (seenMap.has(object)) {
            return seenMap.get(object)!;
        }

        if (isArray(object)) {
            return deep ? sortArray(object) : object.slice();
        }

        const result: Record<PropertyKey, any> = {};
        const keys = Object.keys(object).sort(compare);

        seenMap.set(object, result);

        for (let i = 0, key: any; i < keys.length; i++) {
            key = keys[i];

            const { get, set, ...descriptor } = Object.getOwnPropertyDescriptor(
                object,
                key
            )!;

            Object.defineProperty(result, key, {
                ...descriptor,
                ...(get || set
                    ? { get, set }
                    : { value: processValue(object[key]) })
            });
        }

        return result;
    };

    return sort(value);
}

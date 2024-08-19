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
export default function sortKeys<T>(
    value: Record<PropertyKey, T> | T[],
    options: SortOptions = {}
): Record<string, any> | any[] {
    if (!isPlainObject(value) && !isArray(value)) {
        throw new TypeError(
            `[sortKeys] value 必须是一个数组或普通对象: ${value}`
        );
    }

    const { deep, compare } = options;
    const seenInput: (Record<string, any> | any[])[] = [];
    const seenOutput: (Record<string, any> | any[])[] = [];

    /**
     * 深度排序数组
     *
     * @param array 要排序的数组
     * @returns 返回排序后的数组
     */
    const deepSortArray = <T extends unknown[]>(array: T): T => {
        const seenIndex = seenInput.indexOf(array);

        if (seenIndex !== -1) {
            return seenOutput[seenIndex] as T;
        }

        const result = [] as unknown as T;
        seenInput.push(array);
        seenOutput.push(result);

        const processItem = (item: any) => {
            if (isArray(item)) {
                return deepSortArray(item);
            }
            if (isPlainObject(item)) {
                return sort(item);
            }
            return item;
        };

        result.push(...array.map(processItem));

        return result;
    };

    const seenMap = new Map<Record<string, any>, Record<string, any>>();

    /**
     * 对对象的键进行排序
     *
     * @param object 要排序的对象
     * @returns 返回排序后的对象
     */
    const sort = <T>(object: Record<string, T>): Record<string, T> => {
        if (seenMap.has(object)) {
            return seenMap.get(object)!;
        }

        const result: Record<string, T> = {};
        const keys = Object.keys(object).sort(compare);

        seenMap.set(object, result);

        const processValue = (value: T) => {
            if (deep && isArray(value)) {
                return deepSortArray(value);
            }
            return deep && isPlainObject(value) ? sort(value) : value;
        };

        for (let i = 0, key; i < keys.length; i++) {
            key = keys[i];

            Object.defineProperty(result, key, {
                ...Object.getOwnPropertyDescriptor(object, key),
                value: processValue(object[key])
            });
        }

        return result;
    };

    if (isArray(value)) {
        return deep ? deepSortArray(value) : value.slice();
    }

    return sort(value);
}

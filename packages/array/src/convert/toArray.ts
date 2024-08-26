import { isArray, isNull, isUndefined } from '@curong/types';

import type { ToArrayOptions } from './types';

/**
 * 将给定的值转换为数组
 *
 * @param value 要转换的值
 * @param options 配置选项
 *  - `allowNull`: 当值为 `null` 时是否可以转换为 `[null]`。默认为 `false`
 *  - `allowUndefined`: 当值为 `undefined` 时是否可以转换为 `[undefined]`，默认为 `false`
 * @returns 如果是数组则直接返回，否则返回转换后的数组
 * @example
 *
 * ```typescript
 * toArray(1); // [1]
 * toArray(['value']); // ['value']
 * ```
 */
export default function toArray<T>(value: T, options: ToArrayOptions = {}) {
    const { allowNull = false, allowUndefined = false } = options;

    return isArray(value)
        ? value
        : (!allowNull && isNull(value)) ||
            (!allowUndefined && isUndefined(value))
          ? []
          : [value];
}

import { isUintFilled } from '@curong/types';

import { mapToArray } from '../generate';

/**
 * 将一个数组按照指定的步长拆分为二维数组
 *
 * @param value 要处理的数组
 * @param step 每一项的长度，它是一个大于 `0` 的整数
 * @returns 返回拆分好的二维数组
 *  - 如果 `step` 大于或等于 `value.length`，则直接返回 `[value]`
 * @throws 如果 `step` 不是大于 `0` 的整数，则会抛出类型错误
 * @example
 *
 * ```typescript
 * const v = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
 * const ret = splitByStep(v, 5);
 * console.log(ret); // [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11]]
 * ```
 */
export default function splitByStep<T>(value: T[], step: number): T[][] {
    if (!isUintFilled(step)) {
        throw new TypeError('[splitByStep] step 不是一个大于 0 的整数', {
            cause: { value, step }
        });
    }

    if (step >= value.length) {
        return [value];
    }

    return mapToArray(Math.ceil(value.length / step), i =>
        value.slice(i * step, i * step + step)
    );
}

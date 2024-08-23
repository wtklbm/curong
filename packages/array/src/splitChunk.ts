import { isUintFilled } from '@curong/types';

/**
 * 将一个数组按照指定的大小拆分成多个数组
 *
 * @param value 要处理的数组
 * @param step 每一项的数组长度，它是一个大于 `0` 的整数
 * @returns 返回拆分好的内容
 * @throws 如果 `step` 不是大于 `0` 的整数，则会抛出类型错误
 * @example
 *
 * ```typescript
 * const v = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
 * const ret = splitChunk(v, 5);
 * console.log(ret); // [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11]]
 * ```
 */
export default function splitChunk<T>(value: T[], step: number): T[][] {
    if (!isUintFilled(step)) {
        throw new TypeError(
            `[splitChunk] step 不是一个大于 0 的整数: "${step}"`
        );
    }

    if (step >= value.length) {
        return [value];
    }

    const result = [];

    for (let i = 0; i < value.length; i += step) {
        result.push(value.slice(i, i + step));
    }

    return result;
}

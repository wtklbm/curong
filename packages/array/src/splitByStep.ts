import { isUintFilled } from '@curong/types';

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
        throw new TypeError(
            `[splitByStep] step 不是一个大于 0 的整数: ${step}`
        );
    }

    if (step >= value.length) {
        return [value];
    }

    // 可以简写成下面这样，但是运行速度有点慢：
    //return Array.from({ length: Math.ceil(value.length / step) }, (_, i) =>
    //    value.slice(i * step, i * step + step)
    //);

    const result = [];

    for (let i = 0; i < value.length; i += step) {
        result.push(value.slice(i, i + step));
    }

    return result;
}

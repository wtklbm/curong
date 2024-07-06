import { isIntFilled } from '@curong/types';

/**
 * 将一个数组按照指定的步长进行拆分
 *
 * @param value 要处理的内容
 * @param step 步长，它是一个大于 `0` 的整数
 * @returns 返回拆分好的内容
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
    if (!isIntFilled(step)) {
        throw new TypeError(
            `[splitByStep]: step不是一个大于0的整数, step: "${step}"`
        );
    }

    const ret: T[][] = [];

    while (value.length > step) {
        ret[ret.length] = value.splice(0, step);
    }

    ret[ret.length] = value;

    return ret;
}

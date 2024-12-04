import { isNumberFilled } from '@curong/types';

/**
 * 生成一个指定范围的数字数组
 *
 * @param from 数组的起始值 (包含在内)
 * @param to 数组的结束值 (包含在内)
 * @param step 两个相邻数字之间的步长，默认为 `1`
 * @returns 返回生成的数字数组
 *  - 如果 `from` 和 `to` 的值相等，则会返回 `[from]`
 * @note 虽然该函数可以接受小数作为参数，但是为了避免精度问题，请不要使用小数
 * @throws
 *  - 如果 `step` 不是不为 0 的有限数，则会抛出异常
 *  - 如果 `from` 大于 `to` 且 step 是大于 0 的整数，则会抛出异常
 *  - 如果 `from` 小于 `to` 且 step 是小于 0 的整数，则会抛出异常
 * @example
 * ```typescript
 * // 生成从 0 到 5 的数字数组，步长为 1
 * range(0, 5); // [0, 1, 2, 3, 4, 5]
 *
 * // 生成从 1 到 10 的数字数组，步长为 2
 * range(1, 10, 2); // [1, 3, 5, 7, 9]
 * ```
 */
export default function range(from: number, to: number, step: number = 1) {
    if (!isNumberFilled(step)) {
        throw new TypeError('[range] step 必须是不为 0 的有限数', {
            cause: { from, to, step }
        });
    }

    if (from > to && step > 0) {
        throw new TypeError(
            '[range] 当 from 大于 to 时，step 不能为大于 0 的数',
            {
                cause: { from, to, step }
            }
        );
    }

    if (from < to && step < 0) {
        throw new TypeError(
            '[range] 当 from 小于 to 时，step 不能为小于 0 的数',
            {
                cause: { from, to, step }
            }
        );
    }

    return Array.from(
        { length: Math.floor((to - from) / step) + 1 },
        (_, k) => from + k * step
    );
}

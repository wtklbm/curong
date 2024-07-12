import { isUint } from '@curong/types';

import evaluateInt, { type EvaluableIntValue } from './constants/evaluateInt';

/**
 * 计算超时毫秒数
 *
 * 支持的值的类型:
 * - 如果是一个整数，则直接返回该数
 * - 如果是一个字符串，就会将其转换为数字
 * - 如果是一个函数，则执行该函数，并获取结果
 * - 如果是一个数组，则从数组中随机抽选一个元素，并计算得到结果
 * - 如果是一个对象，则表示生成一个某范围内的数:
 *   - `start`: 开始时的数 (包含)，默认为 `0`
 *   - `end`: 结束时的数 (包含)，默认为 `0`
 */
export type ResolvableTimeoutMs = EvaluableIntValue;

/**
 * 计算传递的值，并得到一个以毫秒为单位的超时时间
 *
 * @param duration 要计算的值
 * @returns 返回一个超时时间。如果超时时间小于 `0`，则会返回 `0`
 * @throws 如果超时时间不是一个大于等于 `0` 且小于 `2147483648` 的整数，则会抛出类型错误异常
 */
export default function timeoutMsResolve(
    duration: ResolvableTimeoutMs
): number {
    const timeout = Math.max(0, evaluateInt(duration));

    // 浏览器内部将延迟存储为 `32` 位有符号整数 (一位用于符号位，数字部分为 `2^31-1`)
    // 当使用大于 `2147483647` 毫秒（约 `24.8` 天）的延迟时，这会导致整数溢出
    if (!isUint(timeout) || timeout > 2147483647) {
        throw new TypeError(
            `[setTimeout] 超时时间应大于等于 0 且不超过 2147483647 毫秒 (约 24.8 天)`
        );
    }

    return timeout;
}

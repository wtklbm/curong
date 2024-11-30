import type { ResolvableTimeoutMs } from './timeoutMsResolve';
import timeoutMsResolve from './timeoutMsResolve';
import type { SetTimeoutDynamicResult } from './types';

/**
 * 设置一个具有动态时间补偿的定时器，一旦定时器到期，就会执行回调
 *
 * 当每一次定时器执行时后，都去获取系统的时间来进行修正。
 * 虽然每次运行可能会有误差，但是通过系统时间对每次运行的修复，
 * 能够让后面每一次时间都得到一个补偿。
 *
 * 时间差为 `0-5ms`，可以忽略不计。
 *
 * @param callback 当定时器到期时，要执行的回调
 * @param duration 以毫秒为单位的超时时间，即在回调之前要等待的时间
 * @param args 传递给 `callback` 的参数
 * @example
 * ```typescript
 * const timer = setTimeoutDynamic((...args) => console.log(args), 3e3, 1, 2, 3);
 *
 * setTimeout(() => {
 *     console.log('时间到了');
 *     clearTimeout(timer.timeoutId);
 * }, 1e3);
 * ```
 */
export default function setTimeoutDynamic<A extends unknown[], R>(
    callback: (...args: A) => R,
    duration: ResolvableTimeoutMs = 0,
    ...args: A
): SetTimeoutDynamicResult {
    const delay = timeoutMsResolve(duration);
    const start = Date.now();
    const end = start + delay;
    const speed = 50;
    const timer: SetTimeoutDynamicResult = { timeoutId: undefined };

    let counter = 1;

    function instance() {
        const now = Date.now();
        const diff = now - start - counter++ * speed;

        if (now >= end) {
            callback.apply(callback, args);
            timer.timeoutId = undefined;
            return;
        }

        timer.timeoutId = setTimeout(instance, speed - diff);
    }

    timer.timeoutId = setTimeout(instance, speed);

    return timer;
}

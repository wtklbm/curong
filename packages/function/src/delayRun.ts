import { range } from '@curong/number';
import { printWarn } from '@curong/term';
import { isNumber, isObject } from '@curong/types';

import fCall from './constants/fCall';
import setTimeout from './setTimeout';
import type { DelayRunOptions } from './types';

const padZero = (num: number | string) => num.toString().padStart(2, '0');
const initTime = new Date('2000-01-01 00:00:00').getTime();

/**
 * 等待一段时间后执行一个同步或异步的函数
 *
 * @param anyTimeout 可以是一个超时时间 (以毫秒为单位) 或一个对象
*
* - 如果参数是大于或等于 `0` 的整数，则表示至少应等待 `duration` 毫秒后执行
* - 如果参数是对象，则表示生成一个随机超时毫秒数:
*   - `start` 开始毫秒数 (包含)，默认为 `0`
*   - `end` 结束毫秒数 (包含)
*   - `show` 是否在终端上显示等待多少时间的信息，默认为 `false`
*
 * @param handler 要执行的函数，可以是同步函数或异步函数
 * @param args 传递给 `handler` 的参数
 * @returns 返回 `handler` 的执行结果
 * @example ````
 *
 * ### 传递一个数字
 *
 * ```typescript
 * // 等待 `10ms` 后执行函数
 * delayRun(10, () => console.log('hello'));
 * ```
 *
 * ### 传递一个对象
 *
 * ```typescript
 * // 从 `3s` 或 `8s` 间生成一个随机时间，等待并执行函数
 * delayRun({
 *     start: 3e3,
 *     end: 8e3,
 *     show: true
 * }, () => console.log('hello'));
 * ```
 */
export default function delayRun<R, A extends unknown[]>(
    anyTimeout: DelayRunOptions | number,
    handler: (...args: A) => Promise<R> | R,
    ...args: A
): Promise<R> {
    let isShow: boolean = false;
    let timeout: number = 0;

    if (isNumber(anyTimeout)) {
        timeout = Math.max(0, anyTimeout);
    } else if (isObject(anyTimeout)) {
        const start = Math.max(0, anyTimeout.start ?? 0);
        const end = Math.max(0, anyTimeout.end ?? 0);
        anyTimeout.show && (isShow = anyTimeout.show);
        timeout =
            end === start
                ? end
                : start < end
                  ? range(end, start)
                  : range(start, end);
    }

    if (isShow && timeout > 0) {
        const date = new Date(initTime + timeout);

        if (timeout < 1e3) {
            printWarn(`等待 ${date.getMilliseconds()} 毫秒`);
        } else if (timeout < 864e5) {
            const minutes = padZero(date.getMinutes());
            const seconds = padZero(date.getSeconds());
            const hours = padZero(date.getHours());
            printWarn(`等待 ${hours}:${minutes}:${seconds}`);
        } else if (timeout < 26784e5) {
            printWarn(`等待 ${date.getDate() - 1} 天`);
        } else {
            printWarn('等待 31 天以上');
        }
    }

    return new Promise(resolve => {
        setTimeout(() => resolve(fCall(handler, args)), timeout);
    });
}

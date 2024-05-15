import { range } from '@curong/number';
import { printWarn } from '@curong/term';
import { isTrue, isObject, isNumber } from '@curong/types';

import type { SleepRunOptions } from './types';

const padZero = (num: number | string) => num.toString().padStart(2, '0');
const initTime = new Date('2000-01-01 00:00:00').getTime();

/**
 * 等待一段时间后执行一个同步或异步的函数
 *
 * @param handler 要执行的函数，如果函数是异步函数，则使用 `await syncRun(()=>{})` 执行
 * @param anyTimeout 参数对象或者一个超时数字，单位 `毫秒`
 *
 * 如果参数是对象:
 *  - `start` 开始的毫秒数，默认为 `0`
 *  - `end` 结束时的毫秒数
 *  - `show` 是否显示等待时间，默认为 `false`
 *
 * 如果参数是数字:
 *  - 如果 `duration` 为小于或等于 0 的数字，则表示定时器应尽快执行
 *  - 如果 `duration` 为一个大于 0 的数字，则表示至少应等待 `duration` 毫秒后执行
 *
 * @returns 返回一个 `Promise` 对象的成功态
 * @example ````
 *
 * ### 传递一个数字
 *
 * ``` javascript
 * const f = () => console.log('hello');
 *
 * // 等待 `10ms` 后执行函数
 * sleepRun(f, 10);
 * ```
 *
 * ### 传递一个对象
 *
 * ```javascript
 * const f = () => console.log('hello');
 *
 * // 从 3s 或 8s 间生成一个随机时间，等待并执行函数
 * sleepRun(f, {
 *     start: 3e3,
 *     end: 8e3,
 *     show: true
 * });
 * ```
 */
export default function sleepRun<T>(
    handler: () => T,
    anyTimeout: SleepRunOptions | number
): Promise<T> {
    let show: boolean = false;
    let timeout: number = 0;

    if (isNumber(anyTimeout)) {
        timeout = anyTimeout;
    } else if (isObject(anyTimeout)) {
        const { start = 0, end = 0 } = anyTimeout;
        anyTimeout.show && (show = anyTimeout.show);
        timeout =
            end === start
                ? end
                : end <= 0 && start <= 0
                  ? 0
                  : start < end
                    ? range(end, start)
                    : range(start, end);
    }

    if (isTrue(show) && timeout > 0) {
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
        let timer: any = setTimeout(() => {
            clearTimeout(timer);
            timer = null;
            return resolve(handler());
        }, timeout);
    });
}

import { isTrue, isObject, isUint } from '@curong/types';
import { range } from '@curong/number';

import { SleepRunOptions } from './types/sleepRun';

const padZero = (num: number | string) => num.toString().padStart(2, '0');
const initDateTime = new Date('2000-01-01 00:00:00').getTime();

/**
 * 等待一段时间后执行一个同步或异步的函数
 *
 * @param handler 要执行的函数，如果函数是异步函数，则使用 `await syncRun(()=>{})` 执行
 * @param anyTimeout 参数对象或者一个超时数字，单位 `毫秒`
 *
 * 参数对象包括的属性:
 *
 * - `start` 开始的毫秒数，默认为 `0`
 * - `end` 结束时的毫秒数
 * - `show` 是否显示等待时间，默认为 `false`
 *
 * @returns 返回一个Promise对象的成功态
 */
export default function sleepRun<T>(
    handler: () => T,
    anyTimeout: SleepRunOptions | number
): Promise<T> {
    let show: boolean = false;
    let timeout: number = 0;

    if (isUint(anyTimeout)) {
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
        const date = new Date(initDateTime + timeout);

        if (timeout < 1e3) {
            console.log(`等待 ${date.getMilliseconds()} 毫秒`);
        } else if (timeout < 864e5) {
            const minutes = padZero(date.getMinutes());
            const seconds = padZero(date.getSeconds());
            const hours = padZero(date.getHours());
            console.log(`等待 ${hours}:${minutes}:${seconds}`);
        } else if (timeout < 26784e5) {
            console.log(`等待 ${date.getDate() - 1} 天`);
        } else {
            console.log('等待 31 天以上');
        }
    }

    return new Promise(resolve => {
        let timer: NodeJS.Timer = setTimeout(() => {
            clearTimeout(timer);
            return resolve(handler());
        }, timeout);
    });
}

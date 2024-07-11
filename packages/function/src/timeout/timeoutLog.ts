import { isUint } from '@curong/types';

const padZero = (num: number | string) => num.toString().padStart(2, '0');
const initTime = new Date('2000-01-01 00:00:00').getTime();

/**
 * 将超时时间打印为一个可读的字符串格式。包含天、小时、分钟和秒
 *
 * @param duration 以毫秒为单位的超时时间
 */
export default function timeoutLog(duration: number) {
    // 浏览器内部将延迟存储为 `32` 位有符号整数 (一位用于符号位，数字部分为 `2^31-1`)
    // 当使用大于 `2147483647` 毫秒（约 `24.8` 天）的延迟时，这会导致整数溢出
    if (!isUint(duration) || duration > 2147483647) {
        throw new TypeError(
            `[timeoutLog] 超时时间应大于或等于 0 且不要超过 2147483647 毫秒 (约 24.8 天)`
        );
    }

    const date = new Date(initTime + duration);
    let formatString: string;
    let millisecond = date.getMilliseconds().toString();

    if (duration < 1e3) {
        formatString = `${millisecond}ms`;
    } else {
        const seconds = padZero(date.getSeconds());
        const minutes = padZero(date.getMinutes());
        const hours = padZero(date.getHours());
        millisecond =
            millisecond === '0' ? '' : `.${millisecond.padStart(3, '0')}`;

        if (duration < 864e5) {
            formatString = `${hours}:${minutes}:${seconds}${millisecond}`;
        } else {
            formatString = `${date.getDate() - 1} 天 ${hours}:${minutes}:${seconds}${millisecond}`;
        }
    }

    console.log(`等待 ${formatString}`);
}

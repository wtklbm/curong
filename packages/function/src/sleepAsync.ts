import { isUint } from '@curong/types';

/**
 * 异步阻塞一段时间
 *
 * @param duration 要阻塞多长时间，以毫秒为单位
 * @throw 如果 duration 不是一个无符号整数，则会抛出异常
 * @example
 *
 * ```javascript
 * console.time('delay');
 * await sleepAsync(20);
 * console.timeEnd('delay'); // 21.0ms
 * ```
 */
export default async function sleepAsync(duration: number): Promise<void> {
    if (!isUint(duration)) {
        throw new TypeError(
            `[sleepAsync]: duration不是一个有效的超时毫秒数: "${duration}"`
        );
    }

    return new Promise(resolve => {
        const timer = setTimeout(() => {
            clearTimeout(timer);
            resolve();
        }, duration);
    });
}

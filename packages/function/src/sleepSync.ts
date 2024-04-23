import { isUint } from '@curong/types';

/**
 * 同步阻塞一段时间
 *
 * @param duration 要阻塞多长时间，以毫秒为单位
 * @throw 如果 duration 不是一个无符号整数，则会抛出异常
 * @example
 *
 * ```javascript
 * console.time('delay');
 * sleepSync(20);
 * console.timeEnd('delay'); // 21.0ms
 * ```
 */
export default function sleepSync(duration: number): void {
    if (!isUint(duration)) {
        throw new TypeError(
            `[sleepSync]: duration不是一个有效的超时毫秒数: "${duration}"`
        );
    }

    for (const start = Date.now(); Date.now() - start < duration; ) {}
}

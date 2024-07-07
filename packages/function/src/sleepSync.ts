import { isUint } from '@curong/types';

/**
 * 同步阻塞一段时间
 *
 * @param duration 要阻塞多长时间，以毫秒为单位
 * @throw 如果 `duration` 不是一个无符号整数，则会抛出类型异常
 * @example
 *
 * ```typescript
 * console.time('delay');
 * sleepSync(20);
 * console.timeEnd('delay'); // 21.0ms
 * ```
 */
export default function sleepSync(duration: number): void {
    if (!isUint(duration)) {
        throw new TypeError(
            `[sleepSync]: duration 必须是一个大于或等于 0 的整数: "${duration}"`
        );
    }

    for (const start = Date.now(); Date.now() - start < duration; ) {}
}

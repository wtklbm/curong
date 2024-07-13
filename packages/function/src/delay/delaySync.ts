import timeoutMsResolve, {
    type ResolvableTimeoutMs
} from '../timeout/timeoutMsResolve';

/**
 * 同步阻塞一段时间
 *
 * @param duration 要阻塞多长时间，以毫秒为单位
 * @note 如果想异步阻塞，请使用 `delay` 方法
 * @example
 *
 * ```typescript
 * console.time('delay');
 * delaySync(20);
 * console.timeEnd('delay'); // 21.0ms
 * ```
 */
export default function delaySync(duration: ResolvableTimeoutMs): void {
    const endTime = Date.now() + timeoutMsResolve(duration);
    while (Date.now() <= endTime) {}
}

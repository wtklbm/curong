import { isZero } from '@curong/types';

import setTimeout from '../timeout/setTimeout';
import timeoutMsResolve, {
    type ResolvableTimeoutMs
} from '../timeout/timeoutMsResolve';

/**
 * 异步阻塞一段时间
 *
 * @param duration 要阻塞多长时间，以毫秒为单位
 * @note 如果想同步阻塞，请使用 `delaySync` 方法
 * @example
 *
 * ```typescript
 * console.time('delay');
 * await delay(20);
 * console.timeEnd('delay'); // 21.0ms
 * ```
 */
export default function delay(duration: ResolvableTimeoutMs): Promise<void> {
    return new Promise(resolve => {
        const timeout = timeoutMsResolve(duration);
        isZero(timeout) ? resolve() : setTimeout(resolve, timeout);
    });
}

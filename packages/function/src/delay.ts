import setTimeout from './setTimeout';

/**
 * 异步阻塞一段时间
 *
 * @param duration 要阻塞多长时间，以毫秒为单位
 * @example
 *
 * ```typescript
 * console.time('delay');
 * await delay(20);
 * console.timeEnd('delay'); // 21.0ms
 * ```
 */
export default async function delay(duration: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, duration));
}

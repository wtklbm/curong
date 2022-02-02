/**
 * 异步阻塞一段时间
 *
 * @param duration 要阻塞多长时间，以毫秒为单位
 *  - 如果 `duration` 为小于或等于 0 的数字，则表示定时器应尽快执行
 *  - 如果 `duration` 为一个大于 0 的数字，则表示至少应等待 `duration` 毫秒后执行
 * @example
 *
 * ```javascript
 * console.time('delay');
 * await sleepAsync(20);
 * console.timeEnd('delay'); // 21.0ms
 * ```
 */
export default async function sleepAsync(duration: number): Promise<void> {
    return new Promise(resolve => {
        let timer: any = setTimeout(() => {
            clearTimeout(timer);
            timer = null;
            resolve();
        }, duration);
    });
}

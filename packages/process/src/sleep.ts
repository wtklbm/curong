/**
 * 睡眠一段时间
 *
 * @param duration 要睡眠多长时间，以毫秒为单位
 */
export default function sleep(duration: number): Promise<void> {
    return new Promise(resolve => {
        const timer = setTimeout(() => {
            resolve();
            clearTimeout(timer);
        }, duration);
    });
}

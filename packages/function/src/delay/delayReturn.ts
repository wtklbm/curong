import pWarper from '../constants/pWarper';
import timeoutMsResolve, {
    type ResolvableTimeoutMs
} from '../timeout/timeoutMsResolve';

import delay from './delay';

/**
 * 执行一个函数，并等待一段时间后再返回
 *
 * @param duration 要阻塞多长时间，以毫秒为单位
 * @param task 要执行的函数，可以是同步函数或异步函数
 * @param args 传递给 `task` 的参数
 * @returns 返回 `task` 的执行结果
 */
export default function delayReturn<R, A extends unknown[]>(
    duration: ResolvableTimeoutMs,
    task: (...args: A) => Promise<R> | R,
    ...args: A
) {
    const paddingMs = timeoutMsResolve(duration);
    const start = Date.now();

    return Promise.all([pWarper(task, args), delay(paddingMs)])
        .then(([result]) => result)
        .catch(error => {
            const elapsed = Date.now() - start;

            if (elapsed > paddingMs) {
                throw error;
            }

            return delay(paddingMs - elapsed).then(() => Promise.reject(error));
        });
}

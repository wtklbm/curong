import { isServiceWorker } from '@curong/types';

/**
 * 当前的执行环境是不是 `ServiceWorker`
 *
 * @throws 如果不是则会抛出类型异常
 */
export default function assertServiceWorker(this: any) {
    if (!isServiceWorker()) {
        throw new TypeError(
            '[assertServiceWorker] 当前的执行环境不是 ServiceWorker',
            {
                cause: { this: this }
            }
        );
    }
}

import { isSharedWorker } from '@curong/types';

/**
 * 当前的执行环境是不是 `SharedWorker`
 *
 * @throws 如果不是则会抛出类型异常
 */
export default function assertSharedWorker(this: any) {
    if (!isSharedWorker()) {
        throw new TypeError(
            '[assertSharedWorker] 当前的执行环境不是 SharedWorker',
            {
                cause: { this: this }
            }
        );
    }
}

import { isWebWorker } from '@curong/types';

/**
 * 当前的执行环境是不是 `Web Worker`
 *
 * @throws 如果不是则会抛出类型异常
 */
export default function assertWebWorker() {
    if (!isWebWorker()) {
        throw new TypeError('[assertWebWorker] 当前的执行环境不是 Web Worker');
    }
}

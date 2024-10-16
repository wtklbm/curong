import { isDedicatedWorker } from '@curong/types';

/**
 * 当前的执行环境是不是 `DedicatedWorker`
 *
 * @throws 如果不是则会抛出类型异常
 */
export default function assertDedicatedWorker() {
    if (!isDedicatedWorker()) {
        throw new TypeError('[assertDedicatedWorker] 当前的执行环境不是 DedicatedWorker');
    }
}

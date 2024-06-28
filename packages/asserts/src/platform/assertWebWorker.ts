import { isWebWorker } from '@curong/types';

/**
 * 当前的执行环境是不是 `Web Worker`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertWebWorker() {
    if (!isWebWorker()) {
        throw new TypeError('[assertWebWorker] 当前的执行环境不是 WebWorker');
    }
}

import { isLinux } from '@curong/types';

/**
 * 当前的执行环境是不是 `Linux`
 *
 * @throws 如果不是则会抛出类型异常
 */
export default function assertLinux() {
    if (!isLinux()) {
        throw new TypeError('[assertLinux] 当前的执行环境不是 Linux');
    }
}

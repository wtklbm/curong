import { isWindows } from '@curong/types';

/**
 * 当前的执行环境是不是 `Windows`
 *
 * @throws 如果不是则会抛出类型异常
 */
export default function assertWindows(this: any) {
    if (!isWindows()) {
        throw new TypeError('[assertWindows] 当前的执行环境不是 Windows', {
            cause: { this: this }
        });
    }
}

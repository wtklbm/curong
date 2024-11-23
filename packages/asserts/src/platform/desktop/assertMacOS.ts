import { isMacOS } from '@curong/types';

/**
 * 当前的执行环境是不是 `macOS`
 *
 * @throws 如果不是则会抛出类型异常
 */
export default function assertMacOS(this: any) {
    if (!isMacOS()) {
        throw new TypeError('[assertMacOS] 当前的执行环境不是 macOS', {
            cause: { this: this }
        });
    }
}

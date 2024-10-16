import { isIOS } from '@curong/types';

/**
 * 当前的执行环境是不是 `iOS`
 *
 * @throws 如果不是则会抛出类型异常
 */
export default function assertIOS() {
    if (!isIOS()) {
        throw new TypeError('[assertIOS] 当前的执行环境不是 iOS');
    }
}

import { isGlobalThis } from '@curong/types';

/**
 * 当前的执行环境是否包含 `globalThis`
 *
 * @throws 如果不是则会抛出类型异常
 */
export default function assertGlobalThis() {
    if (!isGlobalThis()) {
        throw new TypeError('[assertGlobalThis] 当前的执行环境不包含 globalThis');
    }
}

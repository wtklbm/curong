import { isDeno } from '@curong/types';

/**
 * 当前的执行环境是不是 `Deno`
 *
 * @throws 如果不是则会抛出类型异常
 */
export default function assertDeno() {
    if (!isDeno()) {
        throw new TypeError('[assertDeno] 当前的执行环境不是 Deno');
    }
}

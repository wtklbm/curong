import { isBun } from '@curong/types';

/**
 * 当前的执行环境是不是 `Bun`
 *
 * @throws 如果不是则会抛出类型异常
 */
export default function assertBun(this: any) {
    if (!isBun()) {
        throw new TypeError('[assertBun] 当前的执行环境不是 Bun', {
            cause: { this: this }
        });
    }
}

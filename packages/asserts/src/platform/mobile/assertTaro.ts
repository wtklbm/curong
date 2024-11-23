import { isTaro } from '@curong/types';

/**
 * 当前的执行环境是不是 `Taro`
 *
 * @throws 如果不是则会抛出类型异常
 */
export default function assertTaro(this: any) {
    if (!isTaro()) {
        throw new TypeError('[assertTaro] 当前的执行环境不是 Taro', {
            cause: { this: this }
        });
    }
}

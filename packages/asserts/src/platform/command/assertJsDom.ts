import { isJsDom } from '@curong/types';

/**
 * 当前的执行环境是不是 `JsDom`
 *
 * @throws 如果不是则会抛出类型异常
 */
export default function assertJsDom() {
    if (!isJsDom()) {
        throw new TypeError('[assertJsDom] 当前的执行环境不是 JsDom');
    }
}

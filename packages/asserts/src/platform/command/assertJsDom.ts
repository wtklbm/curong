import { isJsDom } from '@curong/types';

/**
 * 当前的执行环境是不是 `JsDom`
 *
 * @param window `jsdom` 中的 `Window` 对象，默认为 `globalThis.window` (即当前执行环境的全局根属性)
 * @throws 如果不是则会抛出类型异常
 */
export default function assertJsDom(window = globalThis.window) {
    if (!isJsDom(window)) {
        throw new TypeError('[assertJsDom] 当前的执行环境不是 JsDom');
    }
}

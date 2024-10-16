import { isAndroid } from '@curong/types';

/**
 * 当前的执行环境是不是 `Android`
 *
 * @throws 如果不是则会抛出类型异常
 */
export default function assertAndroid() {
    if (!isAndroid()) {
        throw new TypeError('[assertAndroid] 当前的执行环境不是 Android');
    }
}

import { isNodejs } from '@curong/types';

/**
 * 当前的执行环境是不是 `Node.js`
 *
 * @throws 如果不是则会抛出类型异常
 */
export default function assertNodejs() {
    if (!isNodejs()) {
        throw new TypeError('[assertNodejs] 当前的执行环境不是 Node.js');
    }
}

import { isNodejsProcess } from '@curong/types';

/**
 * 是不是 `Node.js` 的 `process` 模块
 *
 * @param process `process` 对象，默认为 `globalThis.process`
 * @throws 如果不是则会抛出类型异常
 */
export default function assertNodejsProcess(process = globalThis.process) {
    if (!isNodejsProcess(process)) {
        throw new TypeError('[assertNodejsProcess] 当前的执行环境不是 Node.js 的 process 模块');
    }
}

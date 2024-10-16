import isFunction from '../../function/isFunction';
import getUserAgent from '../constants/getUserAgent';

import isNodejsProcess from './isNodejsProcess';

/**
 * 当前的执行环境是不是 `Node.js`
 *
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isNodejs(): boolean {
    return (
        typeof global === 'object' &&
        global !== null &&
        isFunction(global.clearImmediate) &&
        isNodejsProcess() &&
        globalThis.process.release?.name === 'node' &&
        getUserAgent().startsWith('Node.js/') &&
        isFunction(globalThis.Buffer) &&
        isFunction(globalThis.Buffer.isBuffer)
    );
}

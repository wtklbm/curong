import isFunction from '../../function/isFunction';
import isTypeofObject from '../../object/isTypeofObject';

import getUserAgent from '../constants/getUserAgent';

import isNodejsProcess from './isNodejsProcess';

/**
 * 当前的执行环境是不是 `Node.js`
 *
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isNodejs(): boolean {
    return (
        isTypeofObject(globalThis.global) &&
        isFunction(globalThis.global.clearImmediate) &&
        isNodejsProcess() &&
        globalThis.process.release?.name === 'node' &&
        getUserAgent().startsWith('Node.js/') &&
        isFunction(globalThis.Buffer) &&
        isFunction(globalThis.Buffer.isBuffer)
    );
}

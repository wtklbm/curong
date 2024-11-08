import isFunction from '../../function/function/isFunction';
import isTypeofObject from '../../object/isTypeofObject';

import getUserAgent from '../constants/getUserAgent';

import isNodejsProcess from './isNodejsProcess';

/**
 * 当前的执行环境是不是 `Node.js`
 *
 * @returns 是则返回 `true`，否则为 `false`
 * @note 该方法使用了 `globalThis`，有关更多信息，请参见 `isGlobalThis` 方法
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

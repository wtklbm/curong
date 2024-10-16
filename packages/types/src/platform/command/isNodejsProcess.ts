import isTypeofObject from '../../object/isTypeofObject';
import getTagEqual from '../../type/getTagEqual';

/**
 * 是不是 `Node.js` 的 `process` 模块
 *
 * @param process `process` 对象，默认为 `globalThis.process`
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isNodejsProcess(process = globalThis.process): boolean {
    return isTypeofObject(process) && getTagEqual(process, 'process');
}

import isTypeofObject from '../../object/isTypeofObject';
import getTagEqual from '../../type/getTagEqual';

/**
 * 是不是 `Node.js` 的 `process` 模块
 *
 * `process` 对象的标签是 `[object process]`。
 *
 * @param process `process` 对象，默认为 `globalThis.process`
 * @returns 是则返回 `true`，否则为 `false`
 * @note 该方法使用了 `globalThis`，有关更多信息，请参见 `isGlobalThis` 方法
 */
export default function isNodejsProcess(process = globalThis.process): boolean {
    return isTypeofObject(process) && getTagEqual(process, 'process');
}
